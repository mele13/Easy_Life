/*
MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELE
MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELE
ME                                        LE
ME     MMMMMMMMM            MMMMMMMMM     LE
ME     MMMMMMMMMM          MMMMMMMMMM     LE
ME     MMMMMMMMMMM        MMMMMMMMMMM     LE
ME     MMMMMMMMMMMM      MMMMMMMMMMMM     LE
ME     MMMMMMMM MMMM    MMMM MMMMMMMM     LE
ME     MMMMMMMM  MMMM  MMMM  MMMMMMMM     LE
ME     MMMMMMMM   MMMMMMMM   MMMMMMMM     LE
ME     MMMMMMMM    MMMMMM    MMMMMMMM     LE
ME     MMMMMMMM              MMMMMMMM     LE
ME     MMMMMMMM              MMMMMMMM     LE
ME     MMMMMMMM              MMMMMMMM     LE
ME     MMMMMMMM              MMMMMMMM     LE
ME     MMMMMMMM              MMMMMMMM     LE
ME                                        LE
ME     Mele13                             LE
ME                                        LE
MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELE
MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELE
*/

page = 0;
itemsPerPage = 5;
// const fs = require('fs');
// const fileName = '/lifehack_community/src/json/test.json';
// const file = require(fileName);

// Json functions
function loadLifehacksFromJson() {    
    $.ajax({
        type: "get",
        url: "http://localhost:3000/lifehacks",
        success: function (response) {
            lifehacks = response;
            offset = page * itemsPerPage;

            limit = offset + itemsPerPage;
            count = 0;

            lifehacks.forEach(lifehack => { 
                if(count < offset || count >= limit || count >= lifehacks.length) {
                    count++;                
                    return;
                }            

                article =
                    "<div id='lifehacks-content' class='lifehack'>" +
                    "<div class='image'><img src='" + lifehack.image_path + "'></div>" +
                    "<div class='text-div'><h3 class='lifehack-title'>" + lifehack.title + "</h3>" +
                    "<p class='lifehack-description'>" + lifehack.description +"</p></div>" +
                    "<div class='lifehack-social'>" +
                    "<button>comments</button>" +
                    "<button>likes</button>" +
                    "<a href='" + lifehack.link + "'>link</a>" +
                    "</div></div>";
                $("#lifehacks").append(article);
                count++;
                if(count >= lifehacks.length) {
                    $("#lifehacks-moreResults").hide();
                }
            });
        }
    });
}

function writeIntoJson(url, object) {
    object["id"] = null;
    $.ajax({
        type: "POST",
        url: url,
        data: object,
        success: function (response) {
            return {"status": 200};
        }
    });
}

function updateJsonFile(url, object) {
    $.ajax({
        type: "PUT",
        url: url,
        data: object,
        datatype: "json",
        success: function (response) {
            return {"status": 200};
        }
    });
}

function insertNewLifehack() {
    // Read values
    image_path = document.getElementById("photo-input").value;
    title = document.getElementById("title-input").value;
    description = document.getElementById("description-input").value;
    link = document.getElementById("link-input").value;
    likes = 0
    createdAt = getNowDate()
    comments = []
    //$("#topic").value;

    lifehack = {
        "image_path": image_path,
        "title": title,
        "description": description,
        "link": link,
        "likes": likes,
        "createdAt": createdAt,
        "comment": []
    }

    writeIntoJson("http://localhost:3000/lifehacks", lifehack)
    window.location.href("/lifehacks_community/mainPage.html")
}

function insertCommentInLifehack(lifehackID) {
    // Read values
    title = "Test"
    description = "Description"
    media = null
    createdAt = getNowDate()

    lifehack = {
        "comments": [
            {
                "title": title,
                "description": description,
                "media": media,
                "createdAt": createdAt
            },
            {
                "title": title,
                "description": description,
                "media": media,
                "createdAt": createdAt
            }
        ]
    }

    updateJsonFile("http://localhost:3000/lifehacks/" + lifehackID, lifehack)
}

// Page chooser functions
function lifehacksMoreResults() {
    page++;
    loadLifehacksFromJson();
}

function testing() {    
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/lifehacks",
        success: response => {
            return writeIntoJson("http://localhost:3000/lifehacks", response[0]);
        }
    });
}

// Dropleft/dropdown function
function showOrHideItem(id) {
    dropdown_item_menu = document.getElementById(id);

    if(dropdown_item_menu.style.display == "none" || dropdown_item_menu.style.display == "")
        dropdown_item_menu.style.display = "block";
    else 
        dropdown_item_menu.style.display = "none";
}

// Include function
function include(tag, file) {
    $(tag).load(file);
}

// Load topics function
function loadTopics() {
    var topic = "";

    for (i = 0; i < 10; i++) {
        article = "<p>" + i + "</p>";
        topic += article;
    }
    document.getElementById("articles").innerHTML = topic;
}

// Get input values function
function getValue(input) {
    var title = document.getElementById(input).value;
}

// Get date function
function getNowDate() {
    today = new Date(Date.now())
    return today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()
}

// Validate password
function passwordValidation() {
    var password = document.getElementById("password").value;
    var repeat_password = document.getElementById("repeat-password").value;

    if(password === repeat_password)
        window.location.href("/lifehacks_community/partials/provisionalUntilBackend/mainPageLoggedUser.html");
    else alert("Passwords must match")
}

// Log in redirection
function logInValidation() {
    window.location.href("/lifehacks_community/partials/provisionalUntilBackend/mainPageLoggedUser.html");
}

// Corporate redirection
function corporateValidation() {
    window.location.href("/lifehacks_community/");
}
