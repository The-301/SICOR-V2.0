
//
//  easy-editable-text: http://www.tonylea.com/2010/jquery-easy-editable-text-fields/
//  
//  Modified by Akram El Assas for integration in the uploader.
//

$(document).ready(function () {

    $('.edit').live('click', function () {
        $(this).hide();
        var editable_td = $(this).parent('td').prev('td');
        $('> .text_label', editable_td).hide();
        $('> .hidden_input', editable_td).show();
        $('> .hidden_input', editable_td).select();
    });


    $('.hidden_input').live('blur', function () {
        if ($.trim(this.value) == '') {
            this.value = (this.defaultValue ? this.defaultValue : '');
        }
        else {
            $(this).prev().html(this.value);
        }

        $(this).hide();
        $(this).prev().show();
        var action_td = $(this).parent('td').next('td');
        $('> .edit', action_td).show();
    });

    $('.hidden_input').live('keypress', function (event) {
        if (event.keyCode == '13') {
            if ($.trim(this.value) == '') {
                this.value = (this.defaultValue ? this.defaultValue : '');
            }
            else {
                $(this).prev().html(this.value);
            }

            $(this).hide();
            $(this).prev().show();
            var action_td = $(this).parent('td').next('td');
            $('> .edit', action_td).show();
        }
    });

});