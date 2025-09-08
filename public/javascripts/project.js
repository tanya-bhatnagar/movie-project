$(document).ready(function(){
  
    $('#posterbtn').change(function(){
    $('#poster').attr('src',URL.createObjectURL(posterbtn.files[0]))

    })
   
  $.getJSON('/statecity/fetchallstates',function(response){
     response.data.map((item)=>{
     $('#state').append($("<option>").text(item.statename).val(item.stateid))
    })
 })


  $('#state').change(function(){
    $.getJSON('/statecity/fetchallcity',{stateid:$('#state').val()},function(response){
       
      $('#city').empty()
        $('#city').append($("<option>").text("City"))
        response.data.map((item)=>{
         $('#city').append($("<option>").text(item.cityname).val(item.cityid))
        })
     })
  })


  $('#city').change(function(){
    $.getJSON('/statecity/fetchallcinema',{cityid:$('#city').val()},function(response){
       
      // alert(JSON.stringify(response.data))
        $('#cinema').empty()
        $('#cinema').append($("<option>").text("Cinema"))
        response.data.map((item)=>{
         $('#cinema').append($("<option>").text(item.cinemaname).val(item.cinemaid))
        })
     })
  })



  $('#cinema').change(function(){
    $.getJSON('/statecity/fetchallscreen',{cinemaid:$('#cinema').val()},function(response){
        $('#screen').empty()
        $('#screen').append($("<option>").text("Screen"))
        response.data.map((item)=>{
         $('#screen').append($("<option>").text(item.screenname).val(item.screenid))
        })
     })
  })



})
 