//*******RENDER FUNCTINON********
const render = function (htmlStr) {
    $('.content').html(htmlStr);
};

//GET ALL LIST ITEMS FROM API
const getList = function () {
    let listItem = '';

    $.ajax({ url: '/api/list', method: 'GET' })
        .then(function (data) {
            data.forEach(e => {
                listItem += `<div class="holder">`
                listItem += `<i  id="${e.id}" class="check far fa-square"></i>`
                listItem += `<li class="item">${e.todo}</li>`
                listItem += `<i id="${e.id}" class="fas fa-times"></i></div>`
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
        id: 0,
        todo: $('#todo-input').val().trim(),
        completed: false
    };

    //VALIDATE BOX IS FILLED OUT
    for (let todo in addItem) {
        if (addItem[todo] === '') {
            alert('Please fill out all fields');
            return
        }
    }
    $.ajax({ url: '/api/list/items', method: 'POST', data: JSON.stringify(addItem), contentType: "application/json" })
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
    let id = $(this).prop('id');
    const complete = {
        id: parseFloat(id),
        completed: true
    };
    const notComplete = {
        id: parseFloat(id),
        completed: false
    };
    if(elementClass === 'check far fa-square'){
        $(this).prop('class', 'check fas fa-check-square');
        $(this).siblings('li').addClass('line-through');

        $.ajax({ url: `/api/list/${id}`, method: 'PUT', data: JSON.stringify(complete), contentType: "application/json" })
        .then(function (data) {
            if (data) {    

            }
        })
        .catch(function (err) {
            console.log(err);
        });
    } 
    else{
        $(this).prop('class', 'check far fa-square')
        $(this).siblings('li').removeClass('line-through');
        $.ajax({ url: `/api/list/${id}`, method: 'PUT', data: JSON.stringify(notComplete), contentType: "application/json" })
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
    $.ajax({ url: `/api/list/${id}`, method: 'DELETE' })
        .then(function (data) {
            getList();
        })
        .catch(function (err) {
            console.log(err);
        })
});
gitList();