import { ResponsivePie } from '@nivo/pie';
import { Box, Typography, useTheme } from '@mui/material';
import { useGetSalesQuery } from '../state/api.js';

const BreakdownChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const { data, isLoading } = useGetSalesQuery();

    if (!data || isLoading) return 'Loading...';

    const colors = [
        theme.palette.secondary[500],
        theme.palette.secondary[300],
        theme.palette.secondary[300],
        theme.palette.secondary[500],
    ];

    const formattedData = Object.entries(data.salesByCategory).map(
        ([category, sales], i) => ({
            id: category,
            label: category,
            value: sales,
            color: colors[i],
        })
    );
    return (
        <Box
            height={isDashboard ? '400px' : '100%'}
            width={undefined}
            minHeight={isDashboard ? '325px' : undefined}
            minWidth={isDashboard ? '325px' : undefined}
            position="relative"
        >
            <ResponsivePie
                data={formattedData}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: theme.palette.secondary[200],
                            },
                        },
                        legend: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: theme.palette.secondary[200],
                                strokeWidth: 1,
                            },

                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                    tooltip: {
                        container: {
                            color: theme.palette.primary.main,
                        },
                    },
                }}
                colors={{ datum: 'data.color' }}
                margin={
                    isDashboard
                        ? { top: 40, right: 80, bottom: 100, left: 50 }
                        : { top: 40, right: 80, bottom: 80, left: 80 }
                }
                sortByValue={true}
                innerRadius={0.5}
                padAngle={1}
                cornerRadius={2}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [['opacity', '0.3']],
                }}
                enableArcLinkLabels={!isDashboard}
                arcLinkLabelsSkipAngle={-5}
                arcLinkLabelsTextColor={theme.palette.secondary[200]}
                arcLinkLabelsOffset={-2}
                arcLinkLabelsDiagonalLength={18}
                arcLinkLabelsStraightLength={23}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsRadiusOffset={0.5}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', '2']],
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        justify: false,
                        translateX: isDashboard ? 20 : 0,
                        translateY: isDashboard ? 50 : 56,
                        itemsSpacing: 0,
                        itemWidth: 85,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: theme.palette.primary[500],
                                },
                            },
                        ],
                    },
                ]}
            />
            <Box
                position="absolute"
                top="50%"
                left="50%"
                color={theme.palette.secondary[400]}
                textAlign="center"
                pointerEvents="none"
                sx={{
                    transform: isDashboard
                        ? 'translate(-75%, -170%)'
                        : 'translate(-50%, -100%)',
                }}
            >
                <Typography variant="h6">
                    {!isDashboard && 'Total:'} ${data.yearlySalesTotal}
                </Typography>
            </Box>
        </Box>
    );
};
export default BreakdownChart;
