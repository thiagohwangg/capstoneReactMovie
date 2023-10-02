import { Card } from "components"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState, getHistoryBookingThunk, useAppDispatch } from "store"

export const HistoryBooking = () => {
  const dispatch = useAppDispatch()
  const {historyBooking} = useSelector((state : RootState)=> state.quanLyNguoiDung)
  console.log(historyBooking);
  
  useEffect(()=>{
    dispatch(getHistoryBookingThunk())
  },[dispatch])  
  return (
    <div>
        {
          historyBooking?.thongTinDatVe?.map((v,key)=> {
            return <Card className="!mt-20" key={key}>
              <p className="text-20 text-[var(--primary-color)]">{v.tenPhim}</p>
              <p>Mã vé : {v.maVe}</p>
              <p>Ngày đặt: {v.ngayDat.slice(0,10)}</p>
              <p>Giá vé: {v.giaVe}</p>
              <div>
                Danh sách ghế : {v.danhSachGhe.map(a => `${a.tenGhe} ` )}
              </div>
            </Card>
          })
        }
    </div>
  )
}
