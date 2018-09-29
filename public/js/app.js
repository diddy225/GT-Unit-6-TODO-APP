$(function () {

    //*******RENDER ALL ITEMS TO PAGE********
    const render = function () {
        $('.content').empty();
        $.ajax({ url: '/api/list', method: 'GET' })
            .then(function (dataList) {
                let htmlstr = '';
                dataList.forEach(element => {
                    htmlstr += `<div class="holder">`
                    htmlstr += `<input type="checkbox" id="${element.id}" class="checkbox far fa-square"/>`
                    htmlstr += `<li class="item">${element.todo}</li>`
                    htmlstr += `<i id="${element.id}" class="fas fa-times"></i></div>`
                })
                $('.content').html(htmlstr);
            })
            .catch(function (err) {
                console.log(err);
            });
    };


    //****ADD A NEW ITEM*****
    $('#addBtn').on('click', function (e) {
        e.preventDefault();
        const item = {
            id: 0,
            todo: $('#todo-input').val().trim(),
            completed: false
        };

        for (let todo in item) {
            if (item[todo] === '') {
                alert('Please fill out all fields');
                return;
            }
        }
        $.ajax({ url: '/api/list/items', method: 'POST', data: JSON.stringify(item), contentType: "application/json" })
            .then(function (data) {
                if (data.todo) {
                    $('#todo-input').val('');
                    $('#todo-input').focus('');
                    render();
                }
                else {
                    alert('Cats in the server room again!');
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    });
    //*****UPDATE ITEM THAT IS COMPLETED BY CHECKING THE BOX, AND SETTING COMPLETED TO TRUE OR FALSE******
    $(this).on('change', 'input:checkbox', function (event) {
        event.preventDefault()
        const id = $(this).prop('id');

        if ($(this).prop('checked')) {
            $(this).siblings('li').addClass('line-through'); /*<----THIS GETS THE LIST ITEM TEXT AND CROSSES IT OUT*/
            const completed = {
                id: parseFloat(id),
                completed: true
            }
            //---->SEND TRUE TO API
            $.ajax({ url: `/api/list/`, method: 'PUT', data: JSON.stringify(completed), contentType: "application/json" })
                .then(function () {

                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        else if (!$(this).prop('checked')) {
            $(this).siblings('li').removeClass('line-through');/*<----THIS GETS THE LIST ITEM TEXT AND CROSSES IT OUT*/
            const completed = {
                id: parseFloat(id),
                completed: false
            }
            //----->SEND FALSE TO API
            $.ajax({ url: `/api/list/`, method: 'PUT', data: JSON.stringify(completed), contentType: "application/json" })
                .then(function () {

                })
                .catch(function (err) {
                    console.log(err);
                });
        };
    })

    $(this).on('click', '.fa-times', function (event) {
        event.preventDefault()
        let id = $(this).prop('id');

        $.ajax({url: `/api/list/${id}`, method: 'DELETE'})
        .then(function(){
            
        })
        .catch(function(err){
            console.log(err);
        })
        render();
    });

    render();
});