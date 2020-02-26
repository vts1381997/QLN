var uploadData = require('../data/uploadData')
var uploadController = {

    uploadData: function (body, callback) {
        if (body.ROWID.length > 0) {
            uploadData.updateFile(body, (data) => {
                callback(data)
            })
        }
        else {

            uploadData.uploadData(body, (data) => {
                callback(data)
            })
        }

    },

}



module.exports = uploadController;