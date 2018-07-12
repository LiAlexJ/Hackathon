            $( function() {
                var availableTags = [
                    "Apples",
                    "Orange",
                    "Pinnaples",
                    "Diversity",
                    "Environment",
                    "GlassDoor",
                    "Philantropy",
                    "Women CEOs"
                ];

                function split( val ) {
                    return val.split( /,\s*/ );
                }

                function extractLast( term ) {
                    return split( term ).pop();
                }


                $( "#searchBar" ).on("keydown", function( event ){
                    if ( event.keyCode === $.ui.keyCode.TAB &&
                            $( this ).autocomplete( "instance" ).menu.active) {
                                event.preventDefault();
                            }
                })
                .autocomplete({
                    menLength: 0,
                    delay: 0,
                    autoFocus: true,
                    // source:availableTags,
                    source: function( request, response) {
                        response( $.ui.autocomplete.filter(
                            availableTags, extractLast( request.term ) ) );
                    },

                     focus: function() {
                         return false;
                     },

                    select: function( event, ui ) {
                        var terms = split( this.value );
                        terms.pop()
                        terms.push( ui.item.value );
                        terms.push( "" );
                        this.value = terms.join( ",   " );
                        return false;
                    },

                    open: function(){
                        $("#searchBar").css({"border-top-left-radius":"10px", "border-top-right-radius":"10px", "border-bottom-left-radius":"0px", "border-bottom-right-radius":"0px"});
                    },
                    close:function(){
                        $("#searchBar").css({"border-radius": "10px"});
                    }
                });
            } );