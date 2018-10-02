//*******RENDER FUNCTINON********
const render = function (htmlStr) {
    $('.content').html(htmlStr);
};

//GET ALL LIST ITEMS FROM API
const getList = function () {
    let listItem = '';

    $.ajax({ url:'/api/list', method: 'GET' })
        .then(function (data) {
            data.forEach(e => {
                listItem += `<article class="holder">`
                listItem += `<i  id="${e._id}" class="check far fa-square"></i>`
                listItem += `<li class="item">${e.item}</li>`
                listItem += `<i id="${e._id}" class="fas fa-times"></i></article>`
            })
            render(listItem);
        })
        .catch(function (err) {
            console.log(err);
        });
}

//****ADD A NEW ITEM*****
$('#addBtn').on('click', function (e) {
    e.preventDefault();
    const addItem = {
        item: $('#todo-input').val().trim(),
        completed: false
    };

    //VALIDATE BOX IS FILLED OUT
    for (let todo in addItem) {
        if (addItem[todo] === '') {
            alert('Please fill out all fields');
            return
        }
    }
    $.ajax({url:'/api/list', method: 'POST', data: addItem})
        .then(function (data) {
            if (data) {
                $('#todo-input').val('');
                $('#todo-input').focus('');
                getList();
            }
        })
        .catch(function (err) {
            console.log(err);
        });
});

//*****UPDATE ITEM THAT IS COMPLETED BY CHECKING THE BOX, AND SETTING COMPLETED TO TRUE OR FALSE******
$('.content').on('click', '.check', function(){
    let elementClass = $(this).prop('class');
    const listItem = $(this).siblings('li');
    let id = $(this).prop('id');

    const complete = {
        completed: true
    };
    const notComplete = {
        completed: false
    };
    if(elementClass === 'check far fa-square'){
        $(this).prop('class', 'check fas fa-check-square');
        //$(this).siblings('li').addClass('line-through');

        $.ajax({url:`/api/list/${id}`, method: 'PUT', data: JSON.stringify(complete), contentType: "application/json"})
        .then(function (data) {

        })
        .catch(function (err) {
            console.log(err);
        });
    } 
    else{
        $(this).prop('class', 'check far fa-square')
        //$(this).siblings('li').removeClass('line-through');

        $.ajax({ url: `/api/list/${id}`, method: 'PUT', data: JSON.stringify(notComplete), contentType: "application/json"})
            .then(function (data) {

            })
            .catch(function (err) {
                console.log(err);
            });
    }
})
//DELETE
$('.content').on('click', '.fa-times', function () {
    let id = $(this).prop('id');

    $.ajax({ url:`/api/list/${id}`, method: 'DELETE' })
        .then(function (data) {
            render(getList());
        })
        .catch(function (err) {
            console.log(err);
        })
});
render(getList());
