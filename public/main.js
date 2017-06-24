$('form.ajax').on('submit', function(event){
    
    var vals = {}
    var units = {}
    var data = {}
    
    var that = $(this)

    
    that.find('[name="vall"]').each(function(index, value){
        
        var that = $(this),
                    id = that.attr('id'),
                    value = that.val()
           vals[id] = value;

    })
    
    that.find('[name="units"]').each(function(index, value){
        var that = $(this),
                    id = that.attr('id'),
                    value = that.val()
           units[id] = value;
    })
    
    data.vals = vals
    data.units = units
    data.solve_data = $('[name="solve_data"]').val()
    data.solve_units = $('[name="solve_units"]').val()
    data.direction = $('[name="direction"]').val()
    
   $.ajax({
        url: '/block',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(result){
            console.log(result)
            $('#name_data').html(result)
        }
    })
    
    return false;
})