import { useGetUserPerformanceQuery } from '../../state/api.js';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import Header from '../../components/Header.jsx';
import CustomColumnMenu from '../../components/DataGridCustomColumnMenu.jsx';
import { useGetUserQuery } from '../../state/api.js';

const Performance = () => {
    const theme = useTheme();
    const userId = useSelector((state) => state.global.userId)
    const { data, isLoading } = useGetUserPerformanceQuery(userId);
    
    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 0.9,
        },
        {
            field: 'userId',
            headerName: 'User ID',
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: 'CreatedAt',
            flex: 1,
        },
        {
            field: 'products',
            headerName: '# of Products',
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: 'cost',
            headerName: 'Cost',
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
    ];

    return (
        <Box margin="1.5rem 2.5rem">
            <Header title="PERFORMANCE" subtitle={`Track Affiliate Sales`} />
            <Box
                marginTop="40px"
                height="80vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: theme.palette.primary.light,
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: 'none',
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    rows={(data && data.sales) || []}
                    columns={columns}
                    getRowId={(row) => row._id}
                    components={{
                        ColumnMenu: CustomColumnMenu,
                    }}
                />
            </Box>
        </Box>
    );
};
export default Performance;
