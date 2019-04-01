let defaultContent = $(".main__post-layout__post");

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
                            content.find(".avatar-img").prop("src", "https:" + photo.account.picture_url).attr("alt", photo.account.fullname);
                            content.find(".img-description").html(photo.title[0].content);
                            content.find(".img-location").html(photo.area_name);
                            if (photo.capture_time) {
                                content.find(".img-time").html(
                                    photo.capture_time
                                );
                            } else {
                                content.find(".img-time").html(
                                    "undefined"
                                );
                            };
                            content.find(".main-img").prop("src", "https:" + photo.image_url + "?size=large");
                            if (photo.like_count) {
                                content.find("#like").html(photo.like_count);
                            } else {
                                content.find("#like").html("0");
                            };
                            if (photo.comment_count) {
                                content.find("#comment").html(photo.comment_count);
                            } else {
                                content.find("#comment").html("0");
                            };
                        })
                        .catch(error => {
                            console.log(error)
                        });
                    content.appendTo($(".main__post-layout"));
                });
            })
            .catch(error => {
                console.log(error)
            });
    }
);