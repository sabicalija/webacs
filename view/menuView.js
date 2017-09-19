/*
 * AsTeRICS - Assistive Technology Rapid Integration and Construction Set (http://www.asterics.org)
 * 
 * 
 * Y88b                     d88P      888               d8888  .d8888b.   .d8888b. 
 *  Y88b                   d88P       888              d88888 d88P  Y88b d88P  Y88b
 *   Y88b                 d88P        888             d88P888 888    888 Y88b.
 *    Y88b     d888b     d88P .d88b.  8888888b.      d88P 888 888         "Y888b.  
 *     Y88b   d88888b   d88P d8P  Y8b 888   Y88b    d88P  888 888            "Y88b.
 *      Y88b d88P Y88b d88P  88888888 888    888   d88P   888 888    888       "888
 *       Y88888P   Y88888P   Y8b.     888   d88P  d8888888888 Y88b  d88P Y88b  d88P
 *        Y888P     Y888P     "Y8888  8888888P"  d88P     888  "Y8888P"   "Y8888P"
 * 
 * Copyright 2015 Kompetenznetzwerk KI-I (http://ki-i.at)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
 ACS.menuView = function(modelList) { // ACS.modelList

// ***********************************************************************************************************************
// ************************************************** private variables **************************************************
// ***********************************************************************************************************************
	var menuPanel = ACS.tabPanel(ACS.vConst.MENUVIEW_MENUMOTHERPANEL, ACS.vConst.MENUVIEW_CLASSOFTAB, ACS.vConst.MENUVIEW_CLASSOFPANEL);
	
// ***********************************************************************************************************************
// ************************************************** private methods ****************************************************
// ***********************************************************************************************************************

	// ********************************************** private helper methods *********************************************
	var subtypeIsThere = function(element, subtype) {
		for (var i = 0; i < element.childNodes.length; i++) {
			if (element.childNodes[i].textContent.indexOf(subtype) === 0) return true;
		}
		return false;
	}
	
	var removeWhiteSpace = function(str) {
		var arr = str.split(' ');
		str = '';
		for (var i = 0; i < arr.length; i++) {
			str = str + arr[i].trim();
		}
		return str;
	}
	
	var setSubtype = function(subtype, subtypeNoSpace, typeList, type) {
		var li = document.createElement('li');
		var div = document.createElement('div');
		div.setAttribute('id', type + subtypeNoSpace);
		var divText = document.createTextNode(subtype);
		div.appendChild(divText);
		li.appendChild(div);
		var ul = document.createElement('ul');
		ul.setAttribute('class', 'compMenuL2 compMenu');
		ul.setAttribute('id', type + subtypeNoSpace + 'List');
		ul.setAttribute('data-subtype', subtype);
		li.appendChild(ul);
		document.getElementById(typeList).appendChild(li);
	}
	
	var setComponent = function(actCompName, subtypeNoSpace, type) {
		// set the component in the menu:
		var comp = document.createElement('li');
		var compText = document.createTextNode(actCompName);
		comp.appendChild(compText);
		document.getElementById(type + subtypeNoSpace + 'List').appendChild(comp);
		// set the component in the datalist of the quickselect-field:
		var opt = document.createElement('option');
		opt.setAttribute('value', actCompName);
		document.getElementById('componentsDataList').appendChild(opt);
	}
	
	var getIndexInModelList = function(loadFile) {
		for (var i = 0; i < modelList.getLength(); i++) {
			if (loadFile.name === modelList.getModelAtIndex(i).getFilename()) return i;
		}
		return -1;
	}
	
	var addComponentToModel = function(compObject, actCompName) {
		if (compObject === 'singleton') {
			alert('Sorry, you cannot insert another ' + actCompName + ' - there can be only one per model.');
		} else {
			var remAct = ACS.addComponentAction(modelList.getActModel(), compObject);
			remAct.execute();
		}		
	}
	
	// ********************************************** handlers ***********************************************************
	var componentCollectionChangedEventHandler = function() {
		log.info('menuView: The componentCollection has been changed!');
		returnObj.setComponentMenu();
		// TODO if time: check if all components in model can still be found in componentCollection and delete if not (notify user)
	}
	
	var actModelChangedEventHandler = function() {
		log.info('menuView: A different model has been set to active');
		returnObj.setComponentMenu();
	}
	
	var AREStatusChangedEventHandler = function() {
		switch (ACS.areStatus.getStatus()) {
			case ACS.statusType.DISCONNECTED: 
			case ACS.statusType.CONNECTIONLOST:
				$('#connectAREBtn').removeAttr('disabled');
				$('#disconnectAREBtn').attr('disabled', '');
				$('#uploadModelBtn').attr('disabled', '');
				$('#downloadModelBtn').attr('disabled', '');
				$('#downloadCompCollBtn').attr('disabled', '');
				$('#storeModelAREBtn').attr('disabled', '');
				$('#loadModelAREBtn').attr('disabled', '');
				$('#activateStoredModelBtn').attr('disabled', '');
				$('#deleteStoredModelBtn').attr('disabled', '');
				$('#setAsAutorunBtn').attr('disabled', '');
				$('#startModelBtn').attr('disabled', '');
				$('#pauseModelBtn').attr('disabled', '');
				$('#stopModelBtn').attr('disabled', '');
				break;
			case ACS.statusType.CONNECTING: 
				$('#connectAREBtn').attr('disabled', '');
				$('#disconnectAREBtn').attr('disabled', '');
				$('#uploadModelBtn').attr('disabled', '');
				$('#downloadModelBtn').attr('disabled', '');
				$('#downloadCompCollBtn').attr('disabled', '');
				$('#storeModelAREBtn').attr('disabled', '');
				$('#loadModelAREBtn').attr('disabled', '');
				$('#activateStoredModelBtn').attr('disabled', '');
				$('#deleteStoredModelBtn').attr('disabled', '');
				$('#setAsAutorunBtn').attr('disabled', '');
				$('#startModelBtn').attr('disabled', '');
				$('#pauseModelBtn').attr('disabled', '');
				$('#stopModelBtn').attr('disabled', '');				
				break;
			case ACS.statusType.CONNECTED:
				$('#connectAREBtn').attr('disabled', '');
				$('#disconnectAREBtn').removeAttr('disabled');
				$('#uploadModelBtn').removeAttr('disabled');
				$('#downloadModelBtn').removeAttr('disabled');
				$('#downloadCompCollBtn').removeAttr('disabled');
				$('#storeModelAREBtn').removeAttr('disabled');
				$('#loadModelAREBtn').removeAttr('disabled');
				$('#activateStoredModelBtn').removeAttr('disabled');
				$('#deleteStoredModelBtn').removeAttr('disabled');
				$('#setAsAutorunBtn').removeAttr('disabled');
				$('#startModelBtn').removeAttr('disabled');
				$('#pauseModelBtn').attr('disabled', '');
				$('#stopModelBtn').attr('disabled', '');
				break;
			case ACS.statusType.STARTED:
				$('#connectAREBtn').attr('disabled', '');
				$('#disconnectAREBtn').removeAttr('disabled');
				$('#uploadModelBtn').removeAttr('disabled');
				$('#downloadModelBtn').removeAttr('disabled');
				$('#downloadCompCollBtn').removeAttr('disabled');
				$('#storeModelAREBtn').removeAttr('disabled');
				$('#loadModelAREBtn').removeAttr('disabled');
				$('#activateStoredModelBtn').removeAttr('disabled');
				$('#deleteStoredModelBtn').removeAttr('disabled');
				$('#setAsAutorunBtn').removeAttr('disabled');			
				$('#startModelBtn').attr('disabled', '');
				$('#pauseModelBtn').removeAttr('disabled');
				$('#stopModelBtn').removeAttr('disabled');
				break;
			case ACS.statusType.PAUSED:
				$('#connectAREBtn').attr('disabled', '');
				$('#disconnectAREBtn').removeAttr('disabled');
				$('#uploadModelBtn').removeAttr('disabled');
				$('#downloadModelBtn').removeAttr('disabled');
				$('#downloadCompCollBtn').removeAttr('disabled');
				$('#storeModelAREBtn').removeAttr('disabled');
				$('#loadModelAREBtn').removeAttr('disabled');
				$('#activateStoredModelBtn').removeAttr('disabled');
				$('#deleteStoredModelBtn').removeAttr('disabled');
				$('#setAsAutorunBtn').removeAttr('disabled');			
				$('#startModelBtn').removeAttr('disabled');
				$('#pauseModelBtn').attr('disabled', '');
				$('#stopModelBtn').removeAttr('disabled');
				break;
			case ACS.statusType.STOPPED:
				$('#connectAREBtn').attr('disabled', '');
				$('#disconnectAREBtn').removeAttr('disabled');
				$('#uploadModelBtn').removeAttr('disabled');
				$('#downloadModelBtn').removeAttr('disabled');
				$('#downloadCompCollBtn').removeAttr('disabled');
				$('#storeModelAREBtn').removeAttr('disabled');
				$('#loadModelAREBtn').removeAttr('disabled');
				$('#activateStoredModelBtn').removeAttr('disabled');
				$('#deleteStoredModelBtn').removeAttr('disabled');
				$('#setAsAutorunBtn').removeAttr('disabled');			
				$('#startModelBtn').removeAttr('disabled');
				$('#pauseModelBtn').attr('disabled', '');
				$('#stopModelBtn').attr('disabled', '');					
				break;
		}
	}	
	
	// Menu-Button-Handlers - System-Menu
	var handleConnectARE = function(e) {
		log.debug('menuView: connectAREBtn has been clicked');
		ACS.areStatus.setStatus(ACS.statusType.CONNECTING);
		setBaseURI(ACS.vConst.MENUVIEW_AREBASEURI);
		// check and show current status of ARE (the rest of the connection process takes place in the successcallback, because only when this is a success,
		// we can be sure that an ARE is actually there)
		getModelState(MS_successCallback, MS_errorCallback);
		
		function MS_successCallback(data, HTTPstatus) {
			switch (data) {
				case 'started':	
					ACS.areStatus.setStatus(ACS.statusType.STARTED);
					break;
				case 'paused':	
					ACS.areStatus.setStatus(ACS.statusType.PAUSED);
					break;
				default:
					ACS.areStatus.setStatus(ACS.statusType.CONNECTED);
					break;
			}
			ACS.areStatus.checkAndSetSynchronisation();
			// subscribe to changes of the model state and the model itself
			subscribe(SUBSCRIBE_STATECHANGE_successCallback, SUBSCRIBE_EVENTS_errorCallback, 'model_state_changed');
			subscribe(SUBSCRIBE_MODELCHANGE_successCallback, SUBSCRIBE_EVENTS_errorCallback, 'model_changed');

			function SUBSCRIBE_STATECHANGE_successCallback(data, HTTPstatus) {
				switch (data) {
					case 'pre_start_event':
						ACS.areStatus.setStatus(ACS.statusType.STARTING);
						break;				
					case 'post_start_event':	
						ACS.areStatus.setStatus(ACS.statusType.STARTED);
						break;
					case 'pre_pause_event':	
						ACS.areStatus.setStatus(ACS.statusType.PAUSING);
						break;					
					case 'post_pause_event':	
						ACS.areStatus.setStatus(ACS.statusType.PAUSED);
						break;
					case 'pre_resume_event':
						ACS.areStatus.setStatus(ACS.statusType.RESUMING);
						break;				
					case 'post_resume_event':	
						ACS.areStatus.setStatus(ACS.statusType.STARTED);
						break;					
					case 'pre_stop_event':	
						ACS.areStatus.setStatus(ACS.statusType.STOPPING);
						break;					
					case 'post_stop_event':	
						ACS.areStatus.setStatus(ACS.statusType.STOPPED);
						break;
				}
			}
			
			function SUBSCRIBE_MODELCHANGE_successCallback(data, HTTPstatus) {
				if (data === 'post_deploy_event') ACS.areStatus.checkAndSetSynchronisation();
			}		
			
			function SUBSCRIBE_EVENTS_errorCallback(HTTPstatus, AREerrorMessage) {
				if (AREerrorMessage === 'connectionLost') {
					ACS.areStatus.setStatus(ACS.statusType.CONNECTIONLOST);
				} else {
					ACS.areStatus.setStatus(ACS.statusType.DISCONNECTED);
				}
				ACS.areStatus.setSynchronised(undefined);
				log.debug(AREerrorMessage);
			}			
		}
			
		function MS_errorCallback(HTTPstatus, AREerrorMessage) {
			log.debug(AREerrorMessage);
			alert('Unable to connect to ARE - make sure the baseURL is set correctly and ARE is up and running.')
			ACS.areStatus.setStatus(ACS.statusType.DISCONNECTED);
		}		
	}
	
	var handleDisconnectARE = function(e) {
		log.debug('menuView: DisconnectAREBtn has been clicked');
		unsubscribe('ModelStateChanged');
		unsubscribe('ModelChanged');
		ACS.areStatus.setStatus(ACS.statusType.DISCONNECTED);
		ACS.areStatus.setSynchronised(undefined);
	}
	
	var handleUploadModel = function(e) {
		log.debug('uploading model');
		// check whether all mustbeconnected-ports actually have a connection
		// if not, alert the user and abort upload
		var actModel = modelList.getActModel();
		var problemPorts = [];
		for (var i = 0; i < actModel.componentList.length; i++) {
			for (var j = 0; j < actModel.componentList[i].inputPortList.length; j++) {
				if (actModel.componentList[i].inputPortList[j].getMustBeConnected()) {
					var k = 0;
					var found = false;
					while (!found && (k < actModel.dataChannelList.length)) {
						if (actModel.componentList[i].inputPortList[j] === actModel.dataChannelList[k].getInputPort()) {
							found = true;
						} else {
							k++;
						}
					}
					if (!found) problemPorts.push(actModel.componentList[i].inputPortList[j]);
				}
			}
		}
		if(problemPorts.length > 0) {
			var alertString = ACS.vConst.MENUVIEW_ALERTSTRINGPORTSMUSTBECONNECTED;
			for (var i = 0; i < problemPorts.length; i++) {
				alertString += problemPorts[i].getId() + ' at ' + problemPorts[i].getParentComponent().getComponentTypeId() + '\n';
			}
			alert(alertString);
		} else {
			// actually perform the upload
			var modelInXML = actModel.getModelXMLString();
			uploadModel(UM_successCallback, UM_errorCallback, modelInXML);
			
			function UM_successCallback(data, HTTPstatus) {
				log.debug('success: ' + data);
			}
			
			function UM_errorCallback(HTTPstatus, AREerrorMessage) {
				alert('error: ' + AREerrorMessage + HTTPstatus);
			}
		}
	}
	
	var handleDownloadModel = function(e) {
		log.debug('downloading model');
		downloadDeployedModel(DDM_successCallback, DDM_errorCallback);
			
		function DDM_successCallback(data, HTTPstatus) {
			var modelXML = $.parseXML(data);
			// if active model is not empty, open new model first
			if (modelList.getActModel().componentList.length > 0) modelList.addNewModel();
			// load the model
			modelList.getActModel().loadModel(modelXML);
			ACS.areStatus.setSynchronised(true);
		}
		
		function DDM_errorCallback(HTTPstatus, AREerrorMessage) {
			alert('error: ' + AREerrorMessage);
		}
	}
	
	var handleDownloadComponentCollection = function(e) {
		log.debug('downloading componentCollection');
		getComponentDescriptorsAsXml(CREATED_COMPONENTS_DSCR_successCallback, CREATED_COMPONENTS_DSCR_errorCallback);
					
		function CREATED_COMPONENTS_DSCR_successCallback(data, HTTPstatus) {
			var actMod = modelList.getActModel();
			var deleteList = actMod.getDeleteListForNewComponentCollection(data);
			var modifyList = actMod.getModifyListForNewComponentCollection(data);
			var confirmString = '';
			if (deleteList.length > 0) {
				confirmString += ACS.vConst.MENUVIEW_CONFIRMNEWCOMPONENTCOLLECTIONDELETE;
				for (var i = 0; i < deleteList.length; i++) {
					confirmString += deleteList[i].getId() + '\n';
				}
				confirmString += '\n';
			}
			if (modifyList.length > 0) {
				confirmString += ACS.vConst.MENUVIEW_CONFIRMNEWCOMPONENTCOLLECTIONMODIFY;
				for (var i = 0; i < modifyList.length; i++) {
					confirmString += modifyList[i].getId() + '\n';
				}
			}		
			if (confirmString !== '') {
				confirmString += '\nProceed?'
				if (confirm(confirmString)) {
					actMod.setComponentCollection(data);
					if (deleteList.length > 0) {
						var remAct = ACS.removeItemListAction(actMod, deleteList);
						remAct.execute();
					}
					if (modifyList.length > 0) actMod.modifyComponentsAccordingToComponentCollection(modifyList);
					alert(ACS.vConst.MENUVIEW_ALERTNEWCOMPONENTCOLLECTIONSET);
				}
			} else {
				actMod.setComponentCollection(data);
				alert(ACS.vConst.MENUVIEW_ALERTNEWCOMPONENTCOLLECTIONSET);
			}
		}
		
		function CREATED_COMPONENTS_DSCR_errorCallback(HTTPstatus, AREerrorMessage) {
			alert('error: ' + AREerrorMessage);
		}
	}
	
	var handleStoreModelOnARE = function(e) {
		// first get a list of stored models (to check if filename is already in use and prevent the user from overwriting an old file unwillingly)
		listStoredModels(LSM_successCallback, LSM_errorCallback);
					
		function LSM_successCallback(data, HTTPstatus) {
			var filename = modelList.getActModel().getFilename();
			var modelInXML = modelList.getActModel().getModelXMLString();
			var inputField = document.getElementById('storeModelFilename');
			inputField.value = filename;
			$('#storeModelOnAREDialog').dialog({autoOpen: true,
												modal: true,
												maxWidth: inputField.getAttribute('width'),
												dialogClass: 'no-close',
												buttons: [	
													{
														text: 'Store Model on ARE',
														click: function() {
															var proceedStore = false;
															if (data.indexOf(inputField.value) > -1) {
																if (confirm('A file with the given name already exists. Do you want to overwrite this file?')) proceedStore = true;
															} else {
																proceedStore = true;
															}
															if (proceedStore) {
																// make sure the filename ends with ".acs" (otherwise the ARE won't store it)
																var storeFileName = inputField.value;
																if (storeFileName.indexOf('.acs') != storeFileName.length-4) storeFileName += '.acs';
																// actually perform the store operation
																function STORE_successCallback(data, HTTPstatus) {
																	alert('success: ' + data);
																}
																
																function STORE_errorCallback(HTTPstatus, AREerrorMessage) {
																	alert('error: ' + AREerrorMessage);
																}
																
																storeModel(STORE_successCallback, STORE_errorCallback, storeFileName, modelInXML);
															}
															$(this).dialog('close');
														}
													},
													{
														text: 'Cancel',
														click: function() {
															$(this).dialog('close');
														}
													}
												]});			
		}
		
		function LSM_errorCallback(HTTPstatus, AREerrorMessage) {
			alert('error: ' + AREerrorMessage);
		}				
	}
	
	var handleLoadModelFromARE = function(e) {
		// first get a list of stored models...
		listStoredModels(LSM_successCallback, LSM_errorCallback);
					
		function LSM_successCallback(data, HTTPstatus) {
			document.getElementById('loadModelFromStorageSelector').innerHTML = '<option value="none">--- please choose file ---</option>';
			var selector = document.getElementById('loadModelFromStorageSelector');
			if (data) {
				for (var i = 0; i < data.length; i++) {
					var option = document.createElement('option');
					option.setAttribute('value', data[i]);
					var text = document.createTextNode(data[i]);
					option.appendChild(text);
					selector.appendChild(option);
				}
			}
			$('#loadModelFromStorageDialog').dialog({	autoOpen: true,
														modal: true,
														maxWidth: selector.getAttribute('width'),
														dialogClass: 'no-close',
														buttons: [
															{
																text: 'Load selected Model',
																click: function() {
																	var file = selector.options[selector.selectedIndex].value;
																	if (file && (file != 'none')) {
																		downloadModelFromFile(DMF_successCallback, DMF_errorCallback, file);
																		$(this).dialog('close');
																	} else {
																		alert('Please choose a file from the list or cancel.');
																	}

																	function DMF_successCallback(data, HTTPstatus) {
																		// if active model is not empty, open new model first
																		if (modelList.getActModel().componentList.length > 0) modelList.addNewModel();
																		// load the model received from ARE
																		modelList.getActModel().loadModel($.parseXML(data));
																		// set the correct filename
																		modelList.getActModel().setFilename(file);
																	}
																	
																	function DMF_errorCallback(HTTPstatus, AREerrorMessage) {
																		alert('error: ' + AREerrorMessage);
																	}		
			
																}
															},
															{
																text: 'Cancel',
																click: function() {
																	$(this).dialog('close');
																}
															}
														]});
		}
		
		function LSM_errorCallback(HTTPstatus, AREerrorMessage) {
			alert('error: ' + AREerrorMessage);
		}				
	}
	
	var handleActivateStoredModel = function(e) {
		// first get a list of stored models...
		listStoredModels(LSM_successCallback, LSM_errorCallback);
					
		function LSM_successCallback(data, HTTPstatus) {
			document.getElementById('activateStoredModelSelector').innerHTML = '<option value="none">--- please choose file ---</option>';
			var selector = document.getElementById('activateStoredModelSelector');
			if (data) {
				for (var i = 0; i < data.length; i++) {
					var option = document.createElement('option');
					option.setAttribute('value', data[i]);
					var text = document.createTextNode(data[i]);
					option.appendChild(text);
					selector.appendChild(option);
				}
			}
			$('#activateStoredModelDialog').dialog({autoOpen: true,
													modal: true,
													maxWidth: selector.getAttribute('width'),
													dialogClass: 'no-close',
													buttons: [
														{
															text: 'Activate selected Model',
															click: function() {
																var file = selector.options[selector.selectedIndex].value;
																if (file && (file != 'none')) {
																	deployModelFromFile(DepMF_successCallback, DepMF_errorCallback, file);
																	$(this).dialog('close');
																} else {
																	alert('Please choose a file from the list or cancel.');
																}

																function DepMF_successCallback(data, HTTPstatus) {
																	startModel(START_successCallback, START_errorCallback);
																				
																	function START_successCallback(data, HTTPstatus) {
																		log.debug('success: ' + data);
																	}
																	
																	function START_errorCallback(HTTPstatus, AREerrorMessage) {
																		alert('error: ' + AREerrorMessage);
																	}
																}
																
																function DepMF_errorCallback(HTTPstatus, AREerrorMessage) {
																	alert('error: ' + AREerrorMessage);
																}		
			
															}
														},
														{
															text: 'Cancel',
															click: function() {
																$(this).dialog('close');
															}
														}
													]});			
		}
		
		function LSM_errorCallback(HTTPstatus, AREerrorMessage) {
			alert('error: ' + AREerrorMessage);
		}		
	}
	
	var handleDeleteStoredModel = function(e) {
		// first get a list of stored models...
		listStoredModels(LSM_successCallback, LSM_errorCallback);
					
		function LSM_successCallback(data, HTTPstatus) {
			document.getElementById('deleteStoredModelSelector').innerHTML = '<option value="none">--- please choose file ---</option>';
			var selector = document.getElementById('deleteStoredModelSelector');
			if (data) {
				for (var i = 0; i < data.length; i++) {
					var option = document.createElement('option');
					option.setAttribute('value', data[i]);
					var text = document.createTextNode(data[i]);
					option.appendChild(text);
					selector.appendChild(option);
				}
			}
			$('#deleteStoredModelDialog').dialog({	autoOpen: true,
													modal: true,
													maxWidth: selector.getAttribute('width'),
													dialogClass: 'no-close',
													buttons: [
														{
															text: 'Delete selected Model',
															click: function() {
																var file = selector.options[selector.selectedIndex].value;
																if (file && (file != 'none')) {
																	deleteModelFromFile(DELETE_successCallback, DELETE_errorCallback, file);
																	$(this).dialog('close');
																} else {
																	alert('Please choose a file from the list or cancel.');
																}

																function DELETE_successCallback(data, HTTPstatus) {
																	alert('success: ' + data);
																}
																
																function DELETE_errorCallback(HTTPstatus, AREerrorMessage) {
																	alert('error: ' + AREerrorMessage);
																}		
			
															}
														},
														{
															text: 'Cancel',
															click: function() {
																$(this).dialog('close');
															}
														}
													]});
		}
		
		function LSM_errorCallback(HTTPstatus, AREerrorMessage) {
			alert('error: ' + AREerrorMessage);
		}		
	}
	
	var handleSetAsAutorun = function(e) {
		var filename = 'autostart.acs';
		var modelInXML = modelList.getActModel().getModelXMLString();
		storeModel(STORE_successCallback, STORE_errorCallback, filename, modelInXML);
								
		function STORE_successCallback(data, HTTPstatus) {
			alert('success: ' + data);
		}
		
		function STORE_errorCallback(HTTPstatus, AREerrorMessage) {
			alert('error: ' + AREerrorMessage);
		}				
	}

	var handleStartModel = function(e) {
		startModel(START_successCallback, START_errorCallback);
					
		function START_successCallback(data, HTTPstatus) {
			log.debug('success: ' + data);
		}
		
		function START_errorCallback(HTTPstatus, AREerrorMessage) {
			alert('error: ' + AREerrorMessage);
		}
	}
	
	var handlePauseModel = function(e) {
		pauseModel(PAUSE_successCallback, PAUSE_errorCallback);
					
		function PAUSE_successCallback(data, HTTPstatus) {
			log.debug('success: ' + data);
		}
		
		function PAUSE_errorCallback(HTTPstatus, AREerrorMessage) {
			alert('error: ' + AREerrorMessage);
		}
	}

	var handleStopModel = function(e) {
		stopModel(STOP_successCallback, STOP_errorCallback);
					
		function STOP_successCallback(data, HTTPstatus) {
			log.debug('success: ' + data);
		}
		
		function STOP_errorCallback(HTTPstatus, AREerrorMessage) {
			alert('error: ' + AREerrorMessage);
		}		
	}	

	var handleNewModel = function(e) {
		modelList.addNewModel();
		modelList.getActModel().events.registerHandler('componentCollectionChangedEvent', componentCollectionChangedEventHandler);
	}

	var handleSelectedFile = function(e) {
		if (fileSelector.files[0]) {
			var loadFile = fileSelector.files[0];
			var indexOfModelInList = getIndexInModelList(loadFile);
			if (indexOfModelInList > -1){ // if model already loaded, select it
				modelList.setActModel(indexOfModelInList)
			} else { // else load it
				// if active model is not empty, open new model first
				if (modelList.getActModel().componentList.length > 0) modelList.addNewModel();
				// load the model
				modelList.getActModel().loadModelFromFile(loadFile);
			}
		}
	}
	
	var handleOpenModel = function(e) {
		// Check for the various File API support
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			fileSelector.click();
		} else {
			log.warn('file APIs not supported by browser');
		}
	}
	
	var handleCloseModel = function(e) {
		var m = modelList.getActModel();
		if ((m.hasBeenChanged) && (confirm('Save changes to ' + m.getFilename() + ' before closing?'))) {
			m.saveModel();
		}
		if (modelList.getLength() === 1) {
			var wasLastModelInList = true;
		} else {
			var wasLastModelInList = false;
		}
		modelList.removeModel();
		if (wasLastModelInList) modelList.getActModel().events.registerHandler('componentCollectionChangedEvent', componentCollectionChangedEventHandler);
	}
	
	var handleSaveModel = function(e) {
		modelList.getActModel().saveModel();
	}
	
	// Menu-Button-Handlers - Edit-Menu
	var handleCut = function(e) {
		returnObj.events.fireEvent('cutBtnPressedEvent');
	}
	
	var handleCopy = function(e) {
		returnObj.events.fireEvent('copyBtnPressedEvent');
	}

	var handlePaste = function(e) {
		returnObj.events.fireEvent('pasteBtnPressedEvent');
	}	
	
	var handleDeleteSelection = function(e) {
		returnObj.events.fireEvent('deleteBtnPressedEvent');
	}
	
	var handleUndo = function(e) {
		returnObj.events.fireEvent('undoBtnPressedEvent');
	}
	
	var handleRedo = function(e) {
		returnObj.events.fireEvent('redoBtnPressedEvent');
	}

// ***********************************************************************************************************************
// ************************************************** public stuff *******************************************************
// ***********************************************************************************************************************
	var returnObj = {};
	
	returnObj.events = ACS.eventManager();
	
	returnObj.setComponentMenu = function() {
		// first empty the menu...
		var sensorsBtnList = document.getElementById('sensorsBtnList');
		var processorsBtnList = document.getElementById('processorsBtnList');
		var actuatorsBtnList = document.getElementById('actuatorsBtnList');
		while (sensorsBtnList.hasChildNodes()) sensorsBtnList.removeChild(sensorsBtnList.childNodes[0]);
		while (processorsBtnList.hasChildNodes()) processorsBtnList.removeChild(processorsBtnList.childNodes[0]);
		while (actuatorsBtnList.hasChildNodes()) actuatorsBtnList.removeChild(actuatorsBtnList.childNodes[0]);
		// ...and empty the dataList for the quickSelect
		var dataList = document.getElementById('componentsDataList');
		while (dataList.hasChildNodes()) dataList.removeChild(dataList.childNodes[0]);
		// fill the menu with the new content
		var components = modelList.getActModel().getComponentCollection().getElementsByTagName('componentType');
		// set the subcategories:
		for (var i = 0; i < components.length; i++) {
			var actCompName = components.item(i).attributes.getNamedItem('id').textContent;
			if (actCompName.indexOf('Oska') === -1) actCompName = actCompName.slice(9); // the slice eliminates the "asterics."
			var type = components.item(i).getElementsByTagName('type').item(0).textContent;
			var subtype = components.item(i).getElementsByTagName('type').item(0).attributes.getNamedItem('subtype').textContent;
			var subtypeNoSpace = removeWhiteSpace(subtype);
			switch (type) {
				case 'sensor':
					// set new subcategory, if not yet done so:
					if (!subtypeIsThere(document.getElementById('sensorsBtnList'), subtype)) {
						setSubtype(subtype, subtypeNoSpace, 'sensorsBtnList', 'sensor');
					}
					// set the component:
					setComponent(actCompName, subtypeNoSpace, 'sensor');
					break;
				case 'processor':
					// set new subcategory, if not yet done so:
					if (!subtypeIsThere(document.getElementById('processorsBtnList'), subtype)) {
						setSubtype(subtype, subtypeNoSpace, 'processorsBtnList', 'processor');
					}
					// set the component:
					setComponent(actCompName, subtypeNoSpace, 'processor');
					break;
				case 'actuator':
					// set new subcategory, if not yet done so:
					if (!subtypeIsThere(document.getElementById('actuatorsBtnList'), subtype)) {
						setSubtype(subtype, subtypeNoSpace, 'actuatorsBtnList', 'actuator');
					}
					// set the component:
					setComponent(actCompName, subtypeNoSpace, 'actuator');
					break;
			}
		}
		// destroy the old jqueryui-menu and then init the new one
		if ($('.componentsMenu').menu('instance')) $('.componentsMenu').menu('destroy');
		$('.componentsMenu').menu({
			position: { my: "left top", at: "right top+10" },
			select: function(event, ui) {
						var actCompName = ui.item[0].textContent;
						var compObject = modelList.getActModel().initiateComponentByName(actCompName);
						if (compObject) addComponentToModel(compObject, actCompName);
					}
		});
	}
	
// ***********************************************************************************************************************
// ************************************************** constructor code ***************************************************
// ***********************************************************************************************************************
	var fileSelector = document.createElement('input'); // create "hidden" input element for choosing file
	fileSelector.setAttribute('type', 'file');
	fileSelector.setAttribute('class', 'displayNone'); // must be added to DOM in order for the click event to work in IE
	document.getElementById('mainMenuPanel').appendChild(fileSelector);
	
	// register handlers
	modelList.getActModel().events.registerHandler('componentCollectionChangedEvent', componentCollectionChangedEventHandler);
	modelList.events.registerHandler('actModelChangedEvent', actModelChangedEventHandler);
	ACS.areStatus.events.registerHandler('AREStatusChangedEvent', AREStatusChangedEventHandler);
	fileSelector.addEventListener('change', handleSelectedFile);
	document.getElementById('connectAREBtn').addEventListener('click', handleConnectARE);
	document.getElementById('disconnectAREBtn').addEventListener('click', handleDisconnectARE);
	document.getElementById('uploadModelBtn').addEventListener('click', handleUploadModel);
	document.getElementById('downloadModelBtn').addEventListener('click', handleDownloadModel);
	document.getElementById('downloadCompCollBtn').addEventListener('click', handleDownloadComponentCollection);
	document.getElementById('storeModelAREBtn').addEventListener('click', handleStoreModelOnARE);
	document.getElementById('loadModelAREBtn').addEventListener('click', handleLoadModelFromARE);
	document.getElementById('activateStoredModelBtn').addEventListener('click', handleActivateStoredModel);
	document.getElementById('deleteStoredModelBtn').addEventListener('click', handleDeleteStoredModel);
	document.getElementById('setAsAutorunBtn').addEventListener('click', handleSetAsAutorun);
	document.getElementById('startModelBtn').addEventListener('click', handleStartModel);
	document.getElementById('pauseModelBtn').addEventListener('click', handlePauseModel);
	document.getElementById('stopModelBtn').addEventListener('click', handleStopModel);
	document.getElementById('newModelBtn').addEventListener('click', handleNewModel);
	document.getElementById('openModelBtn').addEventListener('click', handleOpenModel);
	document.getElementById('closeModelBtn').addEventListener('click', handleCloseModel);
	document.getElementById('saveModelBtn').addEventListener('click', handleSaveModel);
	document.getElementById('cutBtn').addEventListener('click', handleCut);
	document.getElementById('copyBtn').addEventListener('click', handleCopy);
	document.getElementById('pasteBtn').addEventListener('click', handlePaste);
	document.getElementById('deleteSelectionBtn').addEventListener('click', handleDeleteSelection);
	document.getElementById('undoBtn').addEventListener('click', handleUndo);
	document.getElementById('redoBtn').addEventListener('click', handleRedo);
	
	// handlers for the quickselect field and the corresponding insert-button
	document.getElementById('quickselect').addEventListener('change', function() {
		var actCompName = this.value;
		var compObject = modelList.getActModel().initiateComponentByName(this.value);
		if (compObject) addComponentToModel(compObject, actCompName);
		this.value = '';
	});
	document.getElementById('insertButton').addEventListener('click', function() {
		var actCompName = document.getElementById('quickselect').value;
		var compObject = modelList.getActModel().initiateComponentByName(document.getElementById('quickselect').value);
		if (compObject) addComponentToModel(compObject, actCompName);
		document.getElementById('quickselect').value = '';
	});

	// window closing handler
	window.onbeforeunload = function() {
		// the desireable behaviour would be the following - sadly currently it only works in IE...
		/*while ((modelList.getLength() > 0) && (modelList.getActModel().hasBeenChanged)) {
			handleCloseModel();
		}*/
		// ... so we're using the second best option:
		for (var i = 0; i < modelList.getLength(); i++) {
			if (modelList.getModelAtIndex(i).hasBeenChanged) return ACS.vConst.MENUVIEW_BEFOREUNLOADMESSAGE;
		}
	}
	
	// set initial status of ARE
	ACS.areStatus.setStatus(ACS.statusType.DISCONNECTED); // to make sure the correct buttons are activated to start with - this will trigger the AREStatusChangedEventHandler and set buttons correctly
	
	return returnObj;
}