$(document).ready(function(){
    $("button").click(function(){
        var input = $("#input").val();
        process_input(input);
    });
});



function process_input(input){
    input = input.replace(/\n/g, "<br />");
    var sentences = input.split(/\.|\?|\!/);

    var html = "",
        color_map = new ColorMap();


    $.each(sentences, function(i, sentence) {
        var trimmed = sentence.trim();
        if (trimmed.length > 0) {
            var word_length = trimmed.split(" ").length,
                color = color_map.get_color_for_length(word_length);
            var marked_up_sentence = "  <span title='" + word_length + "' style='background-color: " + color + "'>" + trimmed + "</span>";
            input = input.replace(sentence, marked_up_sentence);
        }
    });
    $("#output").html(input);
    $("#key").html(color_map.get_key());
}


function ColorMap() {
    this.primary_colors = [
        'ff9999',
        'ffb399',
        'ffcc99',
        'ffe699',
        'ffff99',
        'e6ff99',
        'ccff99',
        'b3ff99',
        '99ff99',
        '99ffb3',
        '99ffcc',
        '99ffe6',
        '99ffff',
        '99e6ff',
        '99ccff',
        '99b3ff',
        '9999ff',
        'b399ff',
        'cc99ff',
        'e699ff',
        'ff99ff',
        'ff99e6',
        'ff99cc',
        'ff99b3',
        'ff9999'
    ];
    this.secondary_colors = [
        'ff3333',
        'ff6633',
        'ff9933',
        'ffcc33',
        'ffff33',
        'ccff33',
        '99ff33',
        '66ff33',
        '33ff33',
        '33ff66',
        '33ff99',
        '33ffcc',
        '33ffff',
        '33ccff',
        '3399ff',
        '3366ff',
        '3333ff',
        '6633ff',
        '9933ff',
        'cc33ff',
        'ff33ff',
        'ff33cc',
        'ff3399',
        'ff3366',
        'ff3333'
    ];

    this._color_map = {};
    this._get_color = _get_color;
    this.get_color_for_length = get_color_for_length;
    this.get_key = get_key;

    function get_color_for_length(word_length){
        var color;
        if(this._color_map[word_length] === undefined){
            color = this._get_color();
            this._color_map[word_length] = color;
        } else{

            color = this._color_map[word_length];
        }
        return "#" + color;
    }
    function _get_color(){
        var color;
        if(this.primary_colors.length > 0){
            color = this.primary_colors[Math.floor(Math.random() * this.primary_colors.length)];
            this.primary_colors.splice(this.primary_colors.indexOf(color), 1);
            return color;
        } else if (this.secondary_colors.length > 0){
            color = this.secondary_colors[Math.floor(Math.random() * this.secondary_colors.length)];
            this.secondary_colors.splice(this.secondary_colors.indexOf(color), 1);
            return color;
        } else{
            return "FF0000";
        }

    }

    function get_key(){
        var keys = Object.keys(this._color_map),
            key_html = '',
            map = this;
        $.each(keys, function(idx, key){
            key_html += "<p style='background-color: " + map.get_color_for_length(key) + "'>" + key + " words";
        });
        return key_html;
    }

}
