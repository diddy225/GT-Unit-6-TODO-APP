$(function(){
    let num = -1;
    const render = function () {
        $('.content').empty();

            $.ajax({url: '/api/list', method: 'GET'})
                    .then(function(dataList){
                        let htmlstr = '';
                        dataList.forEach(element => {
                            htmlstr += `    <div class="row">
                                                <li class="col-6"><i id="${num}" class="col- far fa-square edit"></i>  ${element.todo}</li>
                                                <i class="col- fas fa-times"></i>
                                            </div>`;
                        })

                        $('.content').html(htmlstr);
                    })
                    .catch(function(err){
                        console.log(err);
                    })
    }

    $('#addBtn').on('click', function (event) {
        event.preventDefault();
        const item = {
            id: num = num + 1,
            todo: $('#todo-item').val().trim(),
            completed: false
        };

        for (let todo in item) {
            if (item[todo] === '') {
                alert('Please fill out all fields');
                return;
            }
        }
            $.ajax({url: '/api/list', method: 'POST', data: JSON.stringify(item), contentType: "application/json"})
                .then(function(data){
                    if(data.todo){
                        $('#todo-item').val('');
                        $('#todo-item').focus('');
                        render();
                    }
                    else {
                        alert('Cats in the server room again!');
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
        });

        
    
    $(this).on('click', '.edit', function (event) {
        let number = $(this).attr('id');

        const item = {
            id: number,
            todo: $('#todo-item').val().trim(),
            completed: false
        };

        console.log(item);

        $.ajax({url: `/api/list/${number}`, method: 'PUT', data: JSON.stringify(item), contentType: "application/json"})
            .then(function(data){
                console.log(data);
                $(this).addClass('line-through');
                render()
            })
            .catch(function(err){
                console.log(err);
            });


    });
    render();
});