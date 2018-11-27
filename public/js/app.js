
const render = function(dataList){
  $('#kudos').empty();
  for (let i = 0; i < dataList.length; i++){
    console.log(dataList[i])
    $('#kudos').append(`<div class='card card-kudos'>
    <h4 class=kudosTitle>To: ${dataList[i].to}</h4>
    <h4 class=kudosTitle>From: ${dataList[i].from}</h4>
    <hr>
    <h5 class=kudosTitle>${dataList[i].title}</h5>
    <p class=kudosTitle>${dataList[i].body}</p>
  </div>
</div><br>`)
  }
}
const getKudos = function () {
  $.get(`/api/kudos`)
    .then(function (data) {
      render(data)
      console.log("this is kudos data")
      console.log(data)
    })
}
getKudos();

const postKudos = function(event){
  event.preventDefault();
  const kudosTitle = $('#titleInput').val().trim();
  const kudosBody = $('#bodyInput').val().trim();
  const sender = $('#senderSelect').val();
  const reciever = $('#recieverSelect').val();
  $('#titleInput').val('');
  $('#bodyInput').val('');
  $.post('api/kudos', {title: kudosTitle, body: kudosBody, to: reciever, from: sender })
  .then(function(data){
    console.log(data);
    getKudos();
  })
}
$('#kudos-btn').on('click', postKudos)

