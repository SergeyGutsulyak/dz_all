"use strict";

function crForm(form,formDef){
   var functs={'longtext':textCreate,'number':numberCreate,
                'shorttext':textCreate,'combo':comboCreate,'radio':radioCreate,
                'check':checkCreate, 'memo':memoCreate, 'submit':submitCreate }

    for (var el in formDef) {
       var runFunct=functs[formDef[el].kind];
       var newElement=runFunct(formDef[el]);
       form.appendChild(newElement);
    }
}

function textCreate(curHash){
    var labelText=curHash.label;
    var nameEl=curHash.name;
    
    var newDiv=document.createElement('div')
    newDiv.setAttribute('class',curHash.kind)

    var newLabel=labelCreate(labelText);
    var newInput=document.createElement('input');
    newInput.setAttribute('name',nameEl);
    newInput.setAttribute('type','text');

    newLabel.appendChild(newInput);
    newDiv.appendChild(newLabel);
    return newDiv
}

function numberCreate(curHash){
    var labelText=curHash.label;
    var nameEl=curHash.name;
    
    var newDiv=document.createElement('div')
    newDiv.setAttribute('class',curHash.kind)
    
    var newLabel=labelCreate(labelText);
    var newInput=document.createElement('input');
    newInput.setAttribute('name',nameEl);
    newInput.setAttribute('type','number');

    newLabel.appendChild(newInput);
    newDiv.appendChild(newLabel);
    return newDiv
}

function checkCreate(curHash){
    var labelText=curHash.label;
    var nameEl=curHash.name;
    
    var newDiv=document.createElement('div')
    newDiv.setAttribute('class',curHash.kind)
    
    var newLabel=labelCreate(labelText);
    var newInput=document.createElement('input');
    newInput.setAttribute('name',nameEl);
    newInput.setAttribute('type','chekbox');

    newLabel.appendChild(newInput);
    newDiv.appendChild(newLabel);
    return newDiv
}
function memoCreate(curHash){
    var labelText=curHash.label;
    var nameEl=curHash.name;
    
    var newDiv=document.createElement('div')
    newDiv.setAttribute('class',curHash.kind)
    var newP=document.createElement('P');
    var newTextP=document.createTextNode(labelText);
    newP.appendChild(newTextP);
    newDiv.appendChild(newP);

    var newTextarea=document.createElement('textarea');
    newTextarea.setAttribute('name',nameEl);
 
    newDiv.appendChild(newTextarea);
    return newDiv
}

function submitCreate(curHash){
    var nameEl=curHash.name;
    var newDiv=document.createElement('div')
    newDiv.setAttribute('class',curHash.kind)

    var newInput=document.createElement('input');
    newInput.setAttribute('name',nameEl);
    newInput.setAttribute('type','submit');
    newInput.setAttribute('value',curHash.label);
    newDiv.appendChild(newInput)
    return newDiv;
}
function comboCreate(curHash){
    
    var labelText=curHash.label;
    var variants=curHash.variants;
    var nameEl=curHash.name;
    
    var newDiv=document.createElement('div');
    newDiv.setAttribute('class',curHash.kind)

    var newLabel=labelCreate(labelText);
    var newSelect=document.createElement('select');
    newSelect.setAttribute('name',nameEl)
    newLabel.appendChild(newSelect);
    newDiv.appendChild(newLabel);

    for (var ind in variants){
        var optionHash=variants[ind];
       
        var newOption=document.createElement('option');
        newOption.setAttribute('value',optionHash.value);
        
        var newTextOptions=document.createTextNode(optionHash.text);

        newOption.appendChild(newTextOptions);
        newSelect.appendChild(newOption);
    }

    return newDiv;
}

function labelCreate(labelText){
    var newLabel=document.createElement('label');
    var labelTextObj=document.createTextNode(labelText);
    newLabel.appendChild(labelTextObj);
    return newLabel
}

function radioCreate(curHash){
    var labelText=curHash.label;
    var variants=curHash.variants;
    var nameEl=curHash.name;
    
    var newDiv=document.createElement('div');
    newDiv.setAttribute('class',curHash.kind)

    var newLabel=labelCreate(labelText);
    newDiv.appendChild(newLabel);

    for (var ind in variants){
        var optionHash=variants[ind];
       
        var newInput=document.createElement('input');
        newInput.setAttribute('value',optionHash.value);
        newInput.setAttribute('name',nameEl);
        newInput.setAttribute('type','radio');

        var newSpan=document.createElement('span')
        var newTextRadio=document.createTextNode(optionHash.text);
        newSpan.appendChild(newTextRadio);

        newLabel.appendChild(newInput);
        newLabel.appendChild(newSpan);
    }

    return newDiv;
}
