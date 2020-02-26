var Detail = require('../data/Detail')
var DetailController = {

  DetailDotPHTP: function (id, callback) {
    Detail.DotphtpDetail(id, (data) => {
      callback(data)
    })
  },
  GetToChuc: function (id, callback) {
    Detail.GetToChuc(id, (data) => {
      callback(data)
    })
  },
  traLaiGoc: function (dt, callback) {
    var datasave
    if (dt.laigoc == 0) {
      datasave = {
        DOTPHATHANHTRAIPHIEUID: dt.DOTPHATHANHTRAIPHIEUID,
        TOCHUCTAICHINHID: dt.TOCHUCTAICHINHID,
        NGAYMUA: dt.NGAYMUA,
        TRAGOC: '',
        TRALAI: dt.NGAYTRALAI,
        GHICHU: dt.GHICHU,
        NGAYTRA: dt.NGAYHIENTAI,
        TIENTRAGOC: 0,
        TIENTRALAI: dt.TIENLAI,
        MENHGIA: dt.GIA,
        UUID: dt.UUID
      }
    } else {
      datasave = {
        DOTPHATHANHTRAIPHIEUID: dt.DOTPHATHANHTRAIPHIEUID,
        TOCHUCTAICHINHID: dt.TOCHUCTAICHINHID,
        NGAYMUA: dt.NGAYMUA,
        TRAGOC: dt.NGAYTRAGOC,
        TRALAI: dt.NGAYTRALAI,
        GHICHU: dt.GHICHU,
        NGAYTRA: dt.NGAYHIENTAI,
        TIENTRAGOC: dt.TIENTRAGOC,
        TIENTRALAI: dt.TIENLAI,
        MENHGIA: dt.GIA,
        UUID: dt.UUID
      }
    }

    Detail.traLaiGoc(datasave,dt.laigoc, (data) => {
      callback(data)
    })
  },
  saveDotPHTP: function (body, callback) {
    var dtsave = {
      DOTPHATHANHTRAIPHIEUID: body.DOTPHATHANHTRAIPHIEUID,
      MA: body.MA,
      TEN: body.TEN,
      SOQUYETDINH: body.SOQUYETDINH,
      NGAYQUYETDINH: body.NGAYQUYETDINH,
      KLPHDUKIEN: body.KLPHDUKIEN,
      KLPHTHANHCONG: body.KLPHTHANHCONG,
      LAISUATPHDUKIEN: body.LAISUATPHDUKIEN,
      LAISUATPHTHANHCONG: body.LAISUATPHTHANHCONG,
      KYHANTRAIPHIEU: body.KYHANTRAIPHIEU,
      TENTOCHUCPHATHANH: body.TENTOCHUCPHATHANH,
      TIENTHUCNHAN: body.TIENTHUCNHAN,
      GHICHU: body.GHICHU,
      TINHTHANHID: body.TINHTHANHID,
      DEANPHATHANHTRAIPHIEUID: body.DEANPHATHANHTRAIPHIEUID,
      TOCHUCPHTPID: body.TOCHUCPHTPID,
      STATUS: body.STATUS,
      NOTE: body.NOTE,
      CREATEDDATE: body.CREATEDDATE,
      CREATEDBY: body.CREATEDBY,
      UPDATEDDATE: body.UPDATEDDATE,
      UPDATEDBY: body.UPDATEDBY,
      THOIHANTRAIPHIEU: body.THOIHANTRAIPHIEU,
      NGAYPHATHANH: body.NGAYPHATHANH,
      PHUONGTHUCPHATHANH: body.PHUONGTHUCPHATHANH,
      KLDAOHANTHANHCONG: body.KLDAOHANTHANHCONG,
    }
    Detail.saveDotPHTP(dtsave, (data) => {
      if (data.RESULT) {
        Detail.saveDetailPHTP(body, (data1) => {
          callback(data1)
        })
      } else {
        callback({ MESSAGE: 'error' })
      }

    })
  },

}



module.exports = DetailController;