import { ITransactionStatus } from "@/pages/order/finish"
import { IOrderResponse } from "@/types/order";
import { FaBan, FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { LuPackageCheck } from "react-icons/lu";



const renderFinish = (order: IOrderResponse,status: ITransactionStatus["status"]) => {
    let data;
    switch(status) {
        case "paid" :
            data = {
                icon: <FaRegCheckCircle className="h-full w-full text-white" />,
                title: "Pembayaran berhasil!",
                description: "Terima kasih telah berbelanja di Velaro. Pembayaran kamu telah berhasil dikonfirmasi. Pesananmu akan segera kami proses.",
                button1: {
                    link: `/member/transaction/${order?._id}`,
                    text: "Lihat Detail Pesanan"
                },
                button2: {
                    link: "/",
                    text: "Kembali Belanja"
                },
                nomor: order?.orderId,
                total: order?.total,
                status: order?.status
            }
            break;
        case "pending" :
            data = {
                icon: <FaClockRotateLeft className="h-full w-full text-white" />,
                title: "Menunggu Pembayaran",
                description: "Terima kasih telah berbelanja di Velaro. Pembayaran kamu telah berhasil dikonfirmasi. Pesananmu akan segera kami proses.",
                button1: {
                    link: `/member/transaction/${order?._id}`,
                    text: "Lihat Instruksi Pembayaran"
                },
                button2: {
                    link: "/",
                    text: "Kembali Belanja"
                },
                nomor: order?.orderId,
                total: order?.total,
                status: order?.status
            }
            break;
        case "cancelled" :
            data = {
                icon: <FaBan className="h-full w-full text-white" />,
                title: "Pesanan Dibatalkan",
                description: "Sayang sekali, pesananmu telah dibatalkan. Jika kamu masih ingin memiliki produk pilihanmu, kamu bisa melakukan pemesanan kembali.",
                button1: {
                    link: `/member/transaction/${order?._id}`,
                    text: "Lihat Instruksi Pembayaran"
                },
                button2: {
                    link: "/",
                    text: "Kembali Belanja"
                },
                nomor: order?.orderId,
                total: order?.total,
                status: order?.status
            }
            break;
        case "expired" :
            data = {
                icon: <FaRegClock className="h-full w-full text-white" />,
                title: "Waktu Pembayaran Habis",
                description: "Waktu pembayaran untuk pesananmu telah berakhir. Jangan khawatir, kamu masih bisa memilih produk favoritmu dan melakukan pemesanan kembali di Velaro.",
                button1: {
                    link: `/member/transaction/${order?._id}`,
                    text: "Lihat Instruksi Pembayaran"
                },
                button2: {
                    link: "/",
                    text: "Kembali Belanja"
                },
                nomor: order?.orderId,
                total: order?.total,
                status: order?.status
            }
            break;
        case "completed" :
            data = {
                icon: <LuPackageCheck  className="h-full w-full text-white" />,
                title: "Pesanan Selesai!",
                description: "Terima kasih telah memilih Velaro! Pesananmu telah selesai. Semoga produk pilihanmu memberikan pengalaman yang menyenangkan. Sampai jumpa di pembelian berikutnya!",
                button1: {
                    link: `/member/transaction/${order?._id}`,
                    text: "Lihat Instruksi Pembayaran"
                },
                button2: {
                    link: "/",
                    text: "Kembali Belanja"
                },
                nomor: order?.orderId,
                total: order?.total,
                status: order?.status
            }
            break;
        default :
            data = {
                icon: <LuPackageCheck  className="h-full w-full text-white" />,
                title: "Status tidak diketahui",
                description: "Perlu menghandle status untuk mendapat identifikasi status",
                button1: {
                    link: `/member/transaction/${order?._id}`,
                    text: "Lihat Instruksi Pembayaran"
                },
                button2: {
                    link: "/",
                    text: "Kembali Belanja"
                },
                nomor: order?.orderId,
                total: order?.total,
                status: order?.status
            }
    }
    return data;
}

export default renderFinish;