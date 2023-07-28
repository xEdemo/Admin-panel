import { useState } from 'react';
import { useGetSalesQuery } from '../../state/api.js';
import { FormControl, MenuItem, Box, Select, InputLabel } from '@mui/material';
import Header from '../../components/Header.jsx';
import OverviewChart from '../../components/OverviewChart.jsx';

const Overview = () => {
    const [view, setView] = useState('units');
    return (
        <Box margin="1.5rem 2.5rem">
            <Header
                title="OVERVIEW"
                subtitle="Overview of Revenue and Profit"
            />
            <Box height="75vh">
                <FormControl sx={{ marginTop: '1rem' }}>
                    <InputLabel>View</InputLabel>
                    <Select
                        value={view}
                        label="View"
                        onChange={(e) => setView(e.target.value)}
                    >
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="units">Units</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart view={view} />
            </Box>
        </Box>
    );
};
export default Overview;
