import {
  Paper,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Slider,
  Typography,
  Grid,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

function NotificationFilter({ filter, topN, onFilterChange, onTopNChange }) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Filter Buttons */}
        <Grid item xs={12} sm="auto">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterListIcon color="action" />
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={(e, newFilter) => {
                if (newFilter !== null) onFilterChange(newFilter);
              }}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="unread">Unread Only</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>

        {/* Top N Slider */}
        {filter === 'unread' && (
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Show Top {topN} Messages
              </Typography>
              <Slider
                value={topN}
                onChange={(e, newValue) => onTopNChange(newValue)}
                min={1}
                max={20}
                step={1}
                marks
                valueLabelDisplay="auto"
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

export default NotificationFilter;
