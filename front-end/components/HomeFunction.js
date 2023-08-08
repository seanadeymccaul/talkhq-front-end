import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../GlobalLoginState';

export function homeSort(objectArray, resourcesLength, dates){
    //grab current user info
    //new array for sorted array
    let posResult = new Array();
    let negResult = new Array();
    //sample date for child's dob
    //get age in years function
    var childAges = new Array();
    for (var i = 0; i < dates.length; i++){
        var dob = dates[i].split("/");
        var childDob = new Date(+dob[2], dob[1] - 1, +dob[0])
        var month_diff = Date.now() - childDob.getTime();
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        childAges[i] = Math.abs(year - 1970);
    }
    //wait for child ages to exist
    if (childAges.length > 0){
        for (var i = 0; i < resourcesLength; i++){
            var match = 0;
            var ages = 100;
            try {ages = objectArray[i].age.split(/[-]/);}
            catch(err){
                return;
            }
            for (var j = 0; j < childAges.length; j++){
                if (childAges[j] >= ages[0] && childAges[j] <= ages[1]){
                    match = 1;
                    if (childAges[j] == 0){
                        objectArray[i].temp="A helpful resource for your bub!";
                    }
                    else{
                        objectArray[i].temp="A helpful resource for your " + childAges[j] + " year old!"; 
                    }
                    //console.log("Child age is " + childAges[j] + " and the criteria are " + ages[0] + " " + ages[1])
                    j = childAges.length;
                }
             }
             if (match == 1){
                //console.log("Positive hit for " + ages)
                posResult.push(objectArray[i]);
             }
             else{
                //console.log("Negative hit for " + ages)
                negResult.push(objectArray[i]);
             }
        }
    }
    else{
        return objectArray;
    }
    //console.log("Before concat, length is " + posResult.length);
    posResult = posResult.concat(negResult);
    //console.log("After concat, length is " + posResult.length);
    //console.log(posResult);
    return posResult;
}