//*******RENDER FUNCTINON********
const render = function (htmlStr) {
    $('.content').empty();
    $('.content').append(htmlStr);
};


//GET ALL LIST ITEMS FROM API
const getList = function () {
    $('.content').empty();
    let listItem = '';
    $.ajax({ url:'/api/list', method: 'GET' })
        .then(function (data) {
            data.forEach(e => {
                listItem += `<article class="holder">`
                listItem += `<input class="checkbox" id="${e._id}" type="checkbox">`
                listItem += `<label for="${e._id}">${e.item}</label>`
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
    };

    //VALIDATE BOX IS FILLED OUT
    for (let todo in addItem) {
        if (addItem[todo] === '') {
            alert('Please fill out all fields');
        }
    }
    $.ajax({url:'/api/list', method: 'POST', data: addItem})
        .then(function (data) {
            if (data) {
                $('#todo-input').val('');
                $('#todo-input').focus('');
            }
        })
        .catch(function (err) {
            console.log(err);
        });
        getList();
});

//*****UPDATE ITEM THAT IS COMPLETED BY CHECKING THE BOX, AND SETTING COMPLETED TO TRUE OR FALSE******
$('.content').on('click', '.checkbox', function(){
     if($(this).prop('checked')){
         $(this).siblings('label').css('text-decoration', 'line-through');
     } else {
         $(this).siblings('label').css('text-decoration', 'none');
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
