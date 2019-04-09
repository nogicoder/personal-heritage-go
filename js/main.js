//Showing password
function showPass() {
    var x = document.getElementById("form-group__password");
    y = document.getElementById("form-group__lock");
    // showing password when clicking the clock
    if (x.type === "password") {
        x.type = "text";
        y.className = "fas fa-unlock-alt";
        // and hide password when clicking again
    } else {
        x.type = "password";
        y.className = "fas fa-lock";
    }
}

// ------------------------------------- Fetching Photo -------------------------------------

// Fetching Photo Details
function assignToElements(content, photo) {

    // Fetch Author's Avatar
    content
        .find("#js-avatar")
        .prop("src", "https:" + photo.account.picture_url)
        .attr("alt", photo.account.fullname);

    // Fetch Title
    content
        .find("#js-title")
        .html(photo.title[0].content);

    // Fetch Location
    content
        .find("#js-location")
        .html(photo.area_name);

    // Fetch Capture Time
    if (photo.capture_time) {

        // If Data Exist
        content
            .find("#js-time")
            .html(photo.capture_time);
    } else {

        // If Data Not Exist
        content
            .find("#js-time")
            .html("undefined");
    }

    // Fetch Photo
    content
        .find("#js-photo")
        .prop("src", "https:" + photo.image_url + "?size=large");

    // Fetch Likes
    if (photo.like_count) {
        content
            .find("#js-like")
            .html(photo.like_count);
    } else {
        content
            .find("#js-like")
            .html("0");
    }

    // Fetch Comments
    if (photo.comment_count) {
        content
            .find("#js-comment")
            .html(photo.comment_count);
    } else {
        content
            .find("#js-comment")
            .html("0");
    }
};

//Translate
function translate(content, photo) {

    // translate the caption of the photo
    let photoId = "",
        caption = "",
        locale = "";
    let transIcon = content.find($(".js-translate-icon"));
    $(transIcon).click(function() {
        $(transIcon).removeClass("c-translate-icon--shake");
    });
    let langChoice = content.find($(".js-language-choice"));
    $(langChoice).click(function(item) {
        item.preventDefault();
        let lang = item.target.text
        if (lang === "English") {
            locale = "eng";
        } else if (lang === "Vietnamese") {
            locale = 'vie'
        }
        $(transIcon).removeClass("js-translate-icon");
        $(transIcon).addClass("translate-language");
        $(transIcon).text(lang);
        content.find($(".c-post__title")).css("display", "none");
        content.find($(".c-post__new-title")).css("display", "block");

        let newCaption = content.find($(".c-post__new-title"));
        newCaption.submit(function(inp) {
            inp.preventDefault();
            let photoId = photo.photo_id;
            let caption = $(newCaption).find($("input")).val();
            mHeritageGoService.suggestPhotoCaption(photoId, caption, locale).catch(error => {
                alert(`${caption}\n${error.status}: ${error.statusText}\nServer is coming soon, wait for the great future!`);
                console.log(error);
            });

            $(transIcon).addClass("js-translate-icon");
            $(transIcon).addClass("c-translate-icon--shake");
            $(transIcon).removeClass("translate-language");
            $(transIcon).text("");

            content.find($(".c-post__title")).css("display", "block");
            content.find($(".c-post__new-title")).css("display", "none");
        });
        $(document).click(function(event) {
            if (event.target.tagName.toLowerCase() != 'a' && event.target.tagName.toLowerCase() != 'input' && content.find($(".c-post__new-title")).prop('style')[0] == 'display') {
                content.find($(".c-post__title")).css("display", "block");
                content.find($(".c-post__new-title")).css("display", "none");
                $(transIcon).addClass("js-translate-icon");
                $(transIcon).addClass("c-translate-icon--shake");
                $(transIcon).removeClass("translate-language");
                $(transIcon).text("");
            }
        });
        $(document).scroll(function(event) {
            content.find($(".c-post__title")).css("display", "block");
            content.find($(".c-post__new-title")).css("display", "none");
            $(transIcon).addClass("js-translate-icon");
            $(transIcon).addClass("c-translate-icon--shake");
            $(transIcon).removeClass("translate-language");
            $(transIcon).text("");

        });
    });

}


//Assign photo details to each post
function assignToPost(photo) {
    const defaultContent = $("#js-post");
    let content = defaultContent.clone();
    mHeritageGoService
        .getPhoto(photo)
        .then(photo => {
            console.log(photo);
            assignToElements(content, photo);
            content.appendTo($("main"));
            translate(content, photo);
        })
        .catch(error => {
            console.log(error);
        });
}

//Get detail of each photo
function getPhotoDetail(photos) {
    mHeritageGoService
        .getPhoto(photos[1])
        .then(photo => {
            console.log(photo);
        });
    photos.forEach(photo => {
        assignToPost(photo)
    });
}

//Fetching list of Photos from Heritage GO API
function fetchPhotos() {
    mHeritageGoService
        .getPhotos({
            limit: 10,
            offset: 5,

        })
        .then(photos => {
            getPhotoDetail(photos)
        })
        .catch(error => {
            console.log(error);
        });
}

// Start fetching after the DOM is ready
$(document).ready(fetchPhotos());

// ------------------------------------- UX FEATURES -------------------------------------

//Auto Load More Photo When Scroll
$(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        fetchPhotos();
        $(".l-inner").css("opacity", ".75");
    }
});

//Blur Header When Scroll
$(document).scroll(function() {
    var scroll = $(this).scrollTop();
    $(".js-blur").css({
        '-webkit-transform': 'translateY(-' + scroll + 'px)',
        'transform': 'translateY(-' + scroll + 'px)',
    });
});

$(function() {
    $("main").clone().prependTo($("header")).addClass("js-blur");
    $(".js-blur").css({
        '-webkit-filter': 'blur(.2em)',
        'filter': 'blur(.2em)',
        'background': '#fff',
    });
});