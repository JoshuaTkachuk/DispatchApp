import React,{useState,useEffect} from "react";
import "../styles/Dnd.css";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const InitialData = {
  trucks: {
      'truck-1': { id:'truck-1', contnent: 'truck111' },
      'truck-2': { id:'truck-2', contnent: 'truck112' },
      'truck-3': { id:'truck-3', contnent: 'truck113' },
      'truck-4': { id:'truck-4', contnent: 'truck114' },
  },

columns: {
  'column-1': {
    id: 'column-1',
    title: 'Monday',
    truckIds: ['truck-1', 'truck-2', 'truck-3', 'truck-4'],
    },
  },

  columnOrder: ['column-1'],
};

export default InitialData;

