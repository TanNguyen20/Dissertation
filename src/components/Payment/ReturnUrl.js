import { useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stack, CircularProgress, } from '@mui/material';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useGetVnpReturnUrl from '../../hooks/useGetVnpReturnUrl';
import moment from 'moment';
import FormApi from '../../api/formApi';
const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#202C45',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#E81C2E',
            dark: '#ba000d',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'Barlow',
            '"Segoe UI"',
            'Roboto',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomizedTables() {
    let indexUrl = window.location.href.indexOf("/vnpReturnUrl");
    let paramsVnpUrlReturn = window.location.href.split(window.location.href.substring(0,indexUrl)+"/vnpReturnUrl")[1];
    // console.log(window.location.href.substring(13+indexUrl));
    const [loading, data] = useGetVnpReturnUrl(paramsVnpUrlReturn);
    useEffect(() => {
        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            return e.returnValue = "";
        });
        FormApi.getVnpIpn(paramsVnpUrlReturn).then(res => {
            if(data.vnp_OrderInfo){
                if(data.vnp_OrderInfo.length>0){
                    if(res.RspCode==="00"){
                        let idOrder = (data.vnp_OrderInfo).split('Thanh+toan+dich+vu+oto+viet+cho+don+hang+')[1];
                        FormApi.getOrderById(idOrder).then(res => {
                            if(res.isPaid === false){
                                FormApi.updatePayStatuslOrder(idOrder).then(res => {
                                    console.log(res);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
    },[loading]);

    if (loading) return <>
        <h2 style={{ textAlign: "center" }}>??ang t???i th??ng tin</h2>
        <Stack alignItems="center" mt={10} mb={10}>
            <CircularProgress size={80} />
        </Stack>
    </>;
    let statusPayment = "Th???t b???i";
    switch (data.vnp_ResponseCode) {
        case "00":
            statusPayment = "Th??nh c??ng";
            break;
        case "07":
            statusPayment = "Th???t b???i do giao d???ch b??? nghi ng??? (li??n quan t???i l???a ?????o, giao d???ch b???t th?????ng).";
            break;
        case "09":
            statusPayment = "Th???t b???i do th???/T??i kho???n c???a kh??ch h??ng ch??a ????ng k?? d???ch v??? InternetBanking t???i ng??n h??ng.";
            break;
        case "10":
            statusPayment = "Th???t b???i do kh??ch h??ng x??c th???c th??ng tin th???/t??i kho???n kh??ng ????ng qu?? 3 l???n";
            break;
        case "11":
            statusPayment = "Th???t b???i do ???? h???t h???n ch??? thanh to??n.";
            break;
        case "12":
            statusPayment = "Th???t b???i do th??? b??? kh??a";
            break;
        case "13":
            statusPayment = "Th???t b???i do kh??ch nh???p sai m???t kh???u x??c th???c giao d???ch (OTP)";
            break;
        case "24":
            statusPayment = "Th???t b???i do kh??ch h??ng h???y giao d???ch";
            break;
        case "51":
            statusPayment = "Th???t b???i do t??i kho???n c???a qu?? kh??ch kh??ng ????? s??? d?? ????? th???c hi???n giao d???ch.";
            break;
        case "65":
            statusPayment = "Th???t b???i do t??i kho???n c???a Qu?? kh??ch ???? v?????t qu?? h???n m???c giao d???ch trong ng??y.";
            break;
        case "75":
            statusPayment = "Th???t b???i do ng??n h??ng thanh to??n ??ang b???o tr??."
            break;
        case "79":
            statusPayment = "Th???t b???i do nh???p sai m???t kh???u thanh to??n qu?? s??? l???n quy ?????nh. Xin qu?? kh??ch vui l??ng th???c hi???n l???i giao d???ch"
            break;
        default:
            statusPayment = "Th???t b???i do l???i h??? th???ng";
            break;
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <h2 className="mt-4 text-center">Th??ng tin giao d???ch</h2>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Th??ng tin</StyledTableCell>
                                <StyledTableCell >Gi?? tr???</StyledTableCell>
                                <StyledTableCell >M?? t???</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell >
                                    M?? c???a h??ng
                                </StyledTableCell>
                                <StyledTableCell >{data.vnp_TmnCode}</StyledTableCell>
                                <StyledTableCell >???????c c???p b???i VNPAY</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell >
                                    M?? giao d???ch
                                </StyledTableCell>
                                <StyledTableCell >{data.vnp_TxnRef}</StyledTableCell>
                                <StyledTableCell >M?? giao d???ch c???a b???n</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell >
                                    Th??ng tin giao d???ch
                                </StyledTableCell>
                                <StyledTableCell >{data.vnp_OrderInfo.replaceAll("+", " ")}</StyledTableCell>
                                <StyledTableCell >N???i dung giao d???ch</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell >
                                    Th???i gian thanh to??n
                                </StyledTableCell>
                                <StyledTableCell >{moment(data.vnp_PayDate, "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm:ss")}</StyledTableCell>
                                <StyledTableCell >Th???i gian b???n th???c hi???n thanh to??n giao d???ch</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell >
                                    T???ng ti???n
                                </StyledTableCell>
                                <StyledTableCell >{(parseInt(data.vnp_Amount)/100).toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}</StyledTableCell>
                                <StyledTableCell >S??? ti???n thanh to??n cho giao d???ch</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell >
                                    Tr???ng th??i
                                </StyledTableCell>
                                <StyledTableCell >{statusPayment}</StyledTableCell>
                                <StyledTableCell >Tr???ng th??i giao d???ch</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
}
