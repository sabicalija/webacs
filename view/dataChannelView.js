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
 
 ACS.dataChannelView = function(dc, // ACS.dataChannel
								model, // ACS.model
								modelLayer) { // Kinetic.Layer
								
// ***********************************************************************************************************************
// ************************************************** private variables **************************************************
// ***********************************************************************************************************************
	var outputPort = dc.getOutputPort();
	var inputPort = dc.getInputPort();
	
// ***********************************************************************************************************************
// ************************************************** private methods ****************************************************
// ***********************************************************************************************************************
	var selectLine = function() {
		returnObj.line.stroke(ACS.vConst.DATACHANNELVIEW_SELECTEDSTROKECOLOR);
		returnObj.line.dashEnabled(true);
	}
	
	// ********************************************** handlers ***********************************************************
	var componentPositionChangedEventHandlerInPort = function() {
		returnObj.line.points([	returnObj.line.points()[0], 
								returnObj.line.points()[1], 
								inputPort.getParentComponent().getX() - ACS.vConst.DATACHANNELVIEW_INPUTPORTLEFTOFCOMPONENT,
								inputPort.getParentComponent().getY() + ACS.vConst.DATACHANNELVIEW_FIRSTINPUTPORTDOCKINGPOINTY + ACS.vConst.COMPONENTVIEW_PORTHEIGHTPLUSGAP * inputPort.getPosition()]);
	}
	
	var componentPositionChangedEventHandlerOutPort = function() {
		returnObj.line.points([	outputPort.getParentComponent().getX() + ACS.vConst.DATACHANNELVIEW_OUTPUTPORTPOSITIONX, 
								outputPort.getParentComponent().getY() + ACS.vConst.DATACHANNELVIEW_FIRSTOUTPUTPORTDOCKINGPOINTY + ACS.vConst.COMPONENTVIEW_PORTHEIGHTPLUSGAP * outputPort.getPosition(), 
								returnObj.line.points()[2], 
								returnObj.line.points()[3]]);
	}
	
	var dataChannelCompletedEventHandler = function() {
		// set endpoint and and handler for inputPort and redraw
		inputPort = dc.getInputPort();
		returnObj.line.points([	returnObj.line.points()[0], 
								returnObj.line.points()[1], 
								inputPort.getParentComponent().getX() - ACS.vConst.DATACHANNELVIEW_INPUTPORTLEFTOFCOMPONENT,
								inputPort.getParentComponent().getY() + ACS.vConst.DATACHANNELVIEW_FIRSTINPUTPORTDOCKINGPOINTY + ACS.vConst.COMPONENTVIEW_PORTHEIGHTPLUSGAP * inputPort.getPosition()]);
		inputPort.getParentComponent().events.registerHandler('componentPositionChangedEvent', componentPositionChangedEventHandlerInPort);
		modelLayer.draw();
	}

	var selectedEventHandler = function() {
		selectLine();
		modelLayer.draw();
	}
	
	var deSelectedEventHandler = function() {
		returnObj.line.stroke(ACS.vConst.DATACHANNELVIEW_STROKECOLOR);
		returnObj.line.dashEnabled(false);
		modelLayer.draw();
	}
	
// ***********************************************************************************************************************
// ************************************************** public stuff *******************************************************
// ***********************************************************************************************************************
	var returnObj = ACS.channelView(model, modelLayer);
	
	returnObj.getChannel = function() {
		return dc;
	}
	
	returnObj.destroy = function() {
		// remove all event handlers
		if (inputPort) inputPort.getParentComponent().events.removeHandler('componentPositionChangedEvent', componentPositionChangedEventHandlerInPort);
		outputPort.getParentComponent().events.removeHandler('componentPositionChangedEvent', componentPositionChangedEventHandlerOutPort);
		dc.events.removeHandler('dataChannelCompletedEvent', dataChannelCompletedEventHandler);
		dc.events.removeHandler('selectedEvent', selectedEventHandler);
		dc.events.removeHandler('deSelectedEvent', deSelectedEventHandler);
		// destroy the line
		if (returnObj.line) returnObj.line.destroy();
	}	
	
// ***********************************************************************************************************************
// ************************************************** constructor code ***************************************************
// ***********************************************************************************************************************
	if (inputPort) { // i.e. channel is already complete
		returnObj.line.points([	outputPort.getParentComponent().getX() + ACS.vConst.DATACHANNELVIEW_OUTPUTPORTPOSITIONX, 
								outputPort.getParentComponent().getY() + ACS.vConst.DATACHANNELVIEW_FIRSTOUTPUTPORTDOCKINGPOINTY + ACS.vConst.COMPONENTVIEW_PORTHEIGHTPLUSGAP * outputPort.getPosition(),
								inputPort.getParentComponent().getX() - ACS.vConst.DATACHANNELVIEW_INPUTPORTLEFTOFCOMPONENT,
								inputPort.getParentComponent().getY() + ACS.vConst.DATACHANNELVIEW_FIRSTINPUTPORTDOCKINGPOINTY + ACS.vConst.COMPONENTVIEW_PORTHEIGHTPLUSGAP * inputPort.getPosition()]);
		inputPort.getParentComponent().events.registerHandler('componentPositionChangedEvent', componentPositionChangedEventHandlerInPort);
		// check if channel is already selected on insert
		if (dc.getIsSelected()) selectLine();	
	} else {
		// draw a line with length == 0 - target coordinates will be set on mouse move
		returnObj.line.points([	outputPort.getParentComponent().getX() + ACS.vConst.DATACHANNELVIEW_OUTPUTPORTPOSITIONX, 
								outputPort.getParentComponent().getY() + ACS.vConst.DATACHANNELVIEW_FIRSTOUTPUTPORTDOCKINGPOINTY + ACS.vConst.COMPONENTVIEW_PORTHEIGHTPLUSGAP * outputPort.getPosition(), 
								outputPort.getParentComponent().getX() + ACS.vConst.DATACHANNELVIEW_OUTPUTPORTPOSITIONX, 
								outputPort.getParentComponent().getY() + ACS.vConst.DATACHANNELVIEW_FIRSTOUTPUTPORTDOCKINGPOINTY + ACS.vConst.COMPONENTVIEW_PORTHEIGHTPLUSGAP * outputPort.getPosition()]);
	}
	
	// highlight channel when mouse is over hitGraph
	returnObj.line.on('mouseover', function(e) {
		returnObj.line.strokeWidth(ACS.vConst.CHANNELVIEW_STROKEWIDTH+2);
		modelLayer.draw();
	});
	returnObj.line.on('mouseout', function(e) {
		returnObj.line.strokeWidth(ACS.vConst.CHANNELVIEW_STROKEWIDTH);
		modelLayer.draw();
	});
	
	// do the selecting
	returnObj.line.on('click', function(e) {
		if (e.evt.ctrlKey) { 
			// invert selection status
			var newStatus = !dc.getIsSelected();
			if (newStatus) {
				model.addItemToSelection(dc);
			} else {
				model.removeItemFromSelection(dc);
			}
		} else {
			// select only this channel
			model.deSelectAll();
			model.addItemToSelection(dc);
		}
		e.cancelBubble = true;
	});
	
	// register event handlers
	outputPort.getParentComponent().events.registerHandler('componentPositionChangedEvent', componentPositionChangedEventHandlerOutPort);
	dc.events.registerHandler('dataChannelCompletedEvent', dataChannelCompletedEventHandler);
	dc.events.registerHandler('selectedEvent', selectedEventHandler);
	dc.events.registerHandler('deSelectedEvent', deSelectedEventHandler);
	
	return returnObj;
}