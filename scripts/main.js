function showCard(){
    var p = document.querySelectorAll( ".cardDetails" );

    console.log( p );
    p.forEach( function(){
        if( p.style.display === "none" ){
            p.style.display = "block";
        }
        else{
            p.style.display = "none";
        }
    } );
}
