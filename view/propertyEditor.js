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
 
 ACS.propertyEditor = function(modelList) {

// ***********************************************************************************************************************
// ************************************************** private variables **************************************************
// ***********************************************************************************************************************
	var propertiesTabPanel = ACS.tabPanel(ACS.vConst.PROPERTYEDITOR_MOTHERPANEL, 'propertiesTab', 'propertiesPanel');
	var actModel = modelList.getActModel();
	var propertyTable =document.createElement('table');
	var row = [];
	var cell = null;
	var dropdownList = document.createElement('select');
	var numberInput;
	var textInput;
// ***********************************************************************************************************************
// ************************************************** private methods ****************************************************
// ***********************************************************************************************************************
	
	
	var showPropertiesForComponent = function(selectedComponent){
	    var selectedElement;

		
		if(actModel.selectedItemsList.length===0){//check if only one component is selected
			//get selected component
			for(var i = 0; i<actModel.componentList.length;i++){
				if(actModel.componentList[i].getIsSelected()){
					selectedElement = i;
				}
			}
			
			//if a new element is selected the old propertyEditor has to be removed from the panel
			if(propertyTable.parentNode===document.getElementById('propertiesPanel')){
			document.getElementById('propertiesPanel').removeChild(propertyTable);
			propertyTable=null;
			propertyTable = document.createElement('table');
			row = [];
			cell = null;
			}
			
			
			//var tempString=actModel.componentList[selectedElement].getId();
			for(var h=0; h<actModel.componentList[selectedElement].propertyList.length;h++)
			{
			var tempStringa=actModel.componentList[selectedElement].propertyList[h].getKey();
			row[h] = propertyTable.insertRow(-1);
			cell = row[h].insertCell(0);
			cell.innerHTML = tempStringa;
			tempStringa=actModel.componentList[selectedElement].propertyList[h].combobox;
			var valtemp = actModel.componentList[selectedElement].propertyList[h].value;
			var typetemp = actModel.componentList[selectedElement].propertyList[h].getType();
			
			//generat dropdown list in case that combox includes values
			if(tempStringa !== ''){
				var entries = tempStringa.split('//');
				
				dropdownList = null;
				dropdownList = document.createElement('select');
				for(l=0;l<entries.length;l++){
					
					dropdownList.appendChild(new Option(entries[l],l));
					dropdownList.selectedIndex=valtemp;
					
				}
				
				cell = row[h].insertCell(1);
				cell.appendChild(dropdownList);
			}
			//generate intage field
			//console.log(typetemp);
			if(tempStringa === '' && typetemp===4){
			
				cell = row[h].insertCell(1);
				numberInput = null;
				numberInput = document.createElement("INPUT");
				numberInput.setAttribute("type", "number"); 
				numberInput.setAttribute("value", valtemp); 
				cell.appendChild(numberInput);
			}
			
			console.log(typetemp);
			if(tempStringa === '' && typetemp===5){
				cell = row[h].insertCell(1);
				numberInput = null;
				numberInput = document.createElement("INPUT");
				numberInput.setAttribute("type", "double"); 
				numberInput.setAttribute("value", valtemp); 
				cell.appendChild(numberInput);
			}
			
			if(tempStringa === '' && typetemp===6){
				cell = row[h].insertCell(1);
				textInput = null;
				textInput = document.createElement("INPUT");
				textInput.setAttribute("type", "text"); 
				textInput.setAttribute("value", valtemp); 
				cell.appendChild(textInput);
			}

			}
			
			
			//element.setAttribute("type", "button");
			//element.setAttribute("value", tempString);

			document.getElementById('propertiesPanel').appendChild(propertyTable);
		}
		if(actModel.selectedItemsList.length>0){
			console.info("More than one element selected");
			if(element.parentNOde==document.getElementById('propertiesPanel')){
			document.getElementById('propertiesPanel').removeChild(element);
			}
		}
	}
	
	
	// ********************************************** handlers ***********************************************************
	
	var actModelChangedEventHandler = function(){
		actModel = modelList.getActModel();
	}
	
	var componentAddedEventHandler = function(){
		actModel.componentList[actModel.componentList.length-1].events.registerHandler('selectedEvent',selectedEventHandler);
	}
	
	var selectedEventHandler = function(){
		showPropertiesForComponent();
	}
	
	
// ***********************************************************************************************************************
// ************************************************** public stuff *******************************************************
// ***********************************************************************************************************************
	var returnObj = {};

// ***********************************************************************************************************************
// ************************************************** constructor code ***************************************************
// ***********************************************************************************************************************
	/*var ul = document.createElement('ul');
	ul.setAttribute('id', 'TabList');
	ul.setAttribute('class', 'tablist');
	ul.setAttribute('role', 'tablist');
	document.getElementById(ACS.vConst.PROPERTYEDITOR_MOTHERPANEL).appendChild(ul);
	*/
	var li1 = document.createElement('li');
	li1.setAttribute('id', 'propertiesTab');
	li1.setAttribute('class', 'tab propertiesTab');
	li1.setAttribute('aria-controls', 'propertiesPanel');
	li1.setAttribute('aria-selected', 'false');
	li1.setAttribute('role', 'tab');
	li1.setAttribute('tabindex', -1);
	li1.textContent = ACS.vConst.PROPERTYEDITOR_PROPERTIESHEADER;
	document.getElementById(ACS.vConst.PROPERTYEDITOR_TABLIST).appendChild(li1);
	var div = document.createElement('div');
	div.setAttribute('id', 'propertiesPanel');
	div.setAttribute('class', 'panel propertiesPanel');
	div.setAttribute('aria-labelledby', 'propertiesTab');
	div.setAttribute('role', 'tabpanel');
	document.getElementById(ACS.vConst.PROPERTYEDITOR_MOTHERPANEL).appendChild(div);
		
	var li2 = document.createElement('li');
	li2.setAttribute('id', 'propertiesInputTab');
	li2.setAttribute('class', 'tab propertiesTab');
	li2.setAttribute('aria-controls', 'inputPanel');
	li2.setAttribute('aria-selected', 'false');
	li2.setAttribute('role', 'tab');
	li2.setAttribute('tabindex', -1);
	li2.textContent = ACS.vConst.PROPERTYEDITOR_INPUTHEADER;
	//li2.textContent = 'Input';
	document.getElementById(ACS.vConst.PROPERTYEDITOR_TABLIST).appendChild(li2);
	div = document.createElement('div');
	div.setAttribute('id', 'inputPanel');
	div.setAttribute('class', 'panel propertiesPanel');
	div.setAttribute('aria-labelledby', 'inputTab');
	div.setAttribute('role', 'tabpanel');
	document.getElementById(ACS.vConst.PROPERTYEDITOR_MOTHERPANEL).appendChild(div);
	
	var li3 = document.createElement('li');
	li3.setAttribute('id', 'propertiesOutputTab');
	li3.setAttribute('class', 'tab propertiesTab');
	li3.setAttribute('aria-controls', 'outputPanel');
	li3.setAttribute('aria-selected', 'false');
	li3.setAttribute('role', 'tab');
	li3.setAttribute('tabindex', -1);
	li3.textContent = ACS.vConst.PROPERTYEDITOR_OUTPUTHEADER;
	//li3.textContent='Outputs';
	document.getElementById(ACS.vConst.PROPERTYEDITOR_TABLIST).appendChild(li3);
	div = document.createElement('div');
	div.setAttribute('id', 'outputPanel');
	div.setAttribute('class', 'panel propertiesPanel');
	div.setAttribute('aria-labelledby', 'outputTab');
	div.setAttribute('role', 'tabpanel');
	document.getElementById(ACS.vConst.PROPERTYEDITOR_MOTHERPANEL).appendChild(div);
	
	var li4 = document.createElement('li');
	li4.setAttribute('id', 'propertiesTriggerTab');
	li4.setAttribute('class', 'tab propertiesTab');
	li4.setAttribute('aria-controls', 'triggerPanel');
	li4.setAttribute('aria-selected', 'false');
	li4.setAttribute('role', 'tab');
	li4.setAttribute('tabindex', -1);
	li4.textContent = ACS.vConst.PROPERTYEDITOR_TRIGGERHEADER;
	document.getElementById(ACS.vConst.PROPERTYEDITOR_TABLIST).appendChild(li4);
	div = document.createElement('div');
	div.setAttribute('id', 'triggerPanel');
	div.setAttribute('class', 'panel propertiesPanel');
	div.setAttribute('aria-labelledby', 'triggerTab');
	div.setAttribute('role', 'tabpanel');
	document.getElementById(ACS.vConst.PROPERTYEDITOR_MOTHERPANEL).appendChild(div);
	
	
	propertiesTabPanel.updatePanel();
	// activate the propertiesTab (a simple li.click() will not work in safari)
	var click_ev = document.createEvent("MouseEvents");
	click_ev.initEvent("click", true, true);
	li1.dispatchEvent(click_ev);	
	
	
	
	modelList.events.registerHandler('actModelChangedEvent', actModelChangedEventHandler);
	actModel.events.registerHandler('componentAddedEvent',componentAddedEventHandler);
	
	
	return returnObj;
}