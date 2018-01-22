$(document).ready(function() {
    $('.date-picker').datepicker("update", new Date($("#date").val()));
});

var uploadPhoto = document.getElementById('uploadPhoto');
Event.add(uploadPhoto, 'submit', function (e) {
    e.preventDefault();

    var data = new FormData();
    jQuery.each(jQuery('#input')[0].files, function(i, file) {
        data.append('file-'+i, file);
    });

    jQuery.ajax({
        url: '/admin/media/uploadSlider',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST',
        success:function(data){
            setTimeout(function () {
                console.log(data);
                window.location.reload();
            }, 500);
        },
        error: function(data){
            console.log(data);
        }
    });
});

