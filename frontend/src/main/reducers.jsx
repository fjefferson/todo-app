import React from 'react';
import { combineReducers } from 'redux';
import { task } from '../task/reducer'

export const rootReducer = combineReducers({
    task
});