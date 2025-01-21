$("#subBtn").on("click", function(){
    if(($(".numOfImgs").val()) == 0){
        alert("Value must be bigger than 0")
    }
    fetchCatImgs($(".numOfImgs").val());

     // Shows a loading text to show that imgs are loading
    $("#loading").css("display", "block");

    // Empty out area so imgs are not added onto old get
    $(".catImgContainer").empty();
});

// Calls api and fetches img then calls load function
function fetchCatImgs(count){
    $.ajax({
        url: `https://api.thecatapi.com/v1/images/search?limit=${count}&api_key=${ENV.API_KEY}`,
        type: "GET",
        dataType: "json",
        success: function(response){
            let cats = [];

            for(let i = 0; i < count; i++){
                cats.push(response[i]);
            }
            loadCatImgs(cats);
        }
    })
}

function loadCatImgs(catImgs){
    for(let i = 0; i < catImgs.length; i++){
        $(".catImgContainer").append(`<img src=${catImgs[i].url} class="catImg" alt=${catImgs[i].id}/>`);
    }
    $(".catImg").hover(
        function() {
            $(this).css("border", "4px solid orange"); // On mouse enter
        }, function() {
            $(this).css("border", "none"); // On mouse leave
        }
    );

    $("#loading").css("display", "none");
}
