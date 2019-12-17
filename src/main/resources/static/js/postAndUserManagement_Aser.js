$(function () {

    $(".toggleUser").click(function () {
        let userId = $(this).data("id");
        toggleUser(userId);
    });

    $(".setUserRole").click(function () {
        let userId = $(this).data("id");
        let newRole = $(this).data("role");
        setUserRole(userId, newRole);
    });

    $(".approvePost").click(function () {
        let postId = $.data("id");
        setPostEnabled(postId, true);
    });

    $(".disapprovePost").click(function () {
        let postId = $.data("id");
        setPostEnabled(postId, false);
    });

    $("#addUnhealthyWord").click(function () {
        let word = $.data("word").trim();
        if (!word || word.length > 30 || word.length < 3) {
            alert("You tried to enter a word that is too long or too small. Please try another word.")
        } else {
            addUnhealthyWord(word);
        }
    });

    $("#deleteUnhealthyWord").click(function () {
        let word = $.data("word");
        deleteUnhealthyWord(word);
    });

    function toggleUser(userId) {
        $.ajax({
            type: "POST",
            url: "/admin/toggleUser",
            contentType: "application/json",
            data: JSON.stringify(userId),
            headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            success: function (data) {
                $('#' + userId + '-Enable').text(data);
                if ($('#' + userId + '-CurrentEnabled').text() == "Yes") {
                    $('#' + userId + '-CurrentEnabled').text("No")
                } else {
                    $('#' + userId + '-CurrentEnabled').text("Yes")
                }
            },
            error: function (error) {
                alert("Unable to change user status.");
            }
        });
    }

    function setUserRole(userId, newUserRole) {
        $.ajax({
            type: "POST",
            url: "/admin/setUserRole",
            data: {
                "userId": userId,
                "role": newUserRole
            },
            headers: {
                "X-CSRF-TOKEN":
                    $("meta[name='_csrf']").attr("content")
            }
            ,
            success: function (data) {
                $('#' + userId + '-CurrentRole').text(data);
            }
            ,
            error: function (error) {
                alert("Unable to update user role.");
            }
        })
        ;
    }

    function setPostEnabled(postId, isEnabled) {
        $.ajax({
            type: "POST",
            url: "/admin/postApproval",
            data: {
                "postId": postId,
                "isApproved": isEnabled
            },
            headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            success: function (data) {
                alert("Post approved.");
            },
            error: function (error) {
                alert("Post not processed.");
            }
        });
    }

    function addUnhealthyWord(word) {
        $.ajax({
            type: "POST",
            url: "/unhealthyWords/add",
            contentType: "application/json",
            data: JSON.stringify(word),
            headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            success: function (data) {
                alert("New unhealthy word (" + word + ") added successfully.");
            },
            error: function (error) {
                alert("Unable to add this word to unhealthy word list.");
            }
        });
    }

    function deleteUnhealthyWord(word) {
        $.ajax({
            type: "POST",
            url: "/unhealthyWords/delete",
            contentType: "application/json",
            data: JSON.stringify(word),
            headers: {"X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")},
            success: function (data) {
                alert("Unhealthy word (" + word + ") was deleted successfully.");
            },
            error: function (error) {
                alert("Unable to delete this word from unhealthy word list.");
            }
        });
    }
})