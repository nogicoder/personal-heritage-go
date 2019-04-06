// Show password
function show() {
    var x = document.getElementById("form-group__password");
    y = document.getElementById("form-group__lock");
    if (x.type === "password") {
        x.type = "text";
        y.className = "fas fa-lock-open";
    } else {
        x.type = "password";
        y.className = "fas fa-lock";
    }
}

// Fetching photos
let defaultContent = $("#js-post");

// Fetching photos
$(document).ready(
    function() {
        mHeritageGoService.getPhotos()
            .then(photos => {
                mHeritageGoService.getPhoto(photos[1])
                    .then(photo => {
                        console.log(photo)
                    });
                photos.forEach(photo => {
                    let content = defaultContent.clone();
                    photoInfo = mHeritageGoService.getPhoto(photo).then(photo => {
                            console.log(photo);
                            content.find("#js-avatar").prop("src", "https:" + photo.account.picture_url).attr("alt", photo.account.fullname);
                            content.find("#js-title").html(photo.title[0].content);
                            content.find("#js-location").html(photo.area_name);
                            if (photo.capture_time) {
                                content.find("#js-time").html(
                                    photo.capture_time
                                );
                            } else {
                                content.find("#js-time").html(
                                    "undefined"
                                );
                            };
                            content.find("#js-photo").prop("src", "https:" + photo.image_url + "?size=large");
                            if (photo.like_count) {
                                content.find("#js-like").html(photo.like_count);
                            } else {
                                content.find("#js-like").html("0");
                            };
                            if (photo.comment_count) {
                                content.find("#js-comment").html(photo.comment_count);
                            } else {
                                content.find("#js-comment").html("0");
                            };
                        })
                        .catch(error => {
                            console.log(error)
                        });
                    content.appendTo($(".l-post"));
                });
            })
            .catch(error => {
                console.log(error)
            });
    }
);

// $(window).scroll(() => {
//     $('.header-body').css({ 'opacity': '.75' });
// })

// $(function() {
//     var content = $('.main__post-layout'),
//         header = $('.container');

//     $(content).clone().prependTo(header).addClass('blurred');

//     $('.blurred').css({
//         'background': '#fff',
//         '-webkit-filter': 'blur(.1em)',
//         'filter': 'blur(.1em)',
//     });
// });

// $(document).scroll(function() {
//     var scroll = $(this).scrollTop();
//     $('.blurred').css({
//         '-webkit-transform': 'translateY(-' + scroll + 'px)',
//         'transform': 'translateY(-' + scroll + 'px)'
//     });
// })