let character;

function chooseCharacter(character){
    alert("You chose:" + character.id);
    document.getElementById(character.id).style.backgroundColor = "blue";
}
