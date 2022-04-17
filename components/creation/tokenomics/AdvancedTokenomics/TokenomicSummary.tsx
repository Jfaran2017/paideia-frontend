import { Box, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';
import { ITokenHolder, ITokenomics } from '../../../../lib/creation/Api';
import { IData } from '../../../../lib/utilities';
import { Subheader } from '../../utilities/HeaderComponents';
import InfoIcon from '@mui/icons-material/Info';
import { percentage } from '../../../../lib/creation/Utilities';

const TokenomicsRow: React.FC<{title: string, balance: number, percentage: number}> = (props) => {
    return <Box sx={{display: 'flex', alignItems: 'center', mt: '1rem', mb: '1rem'}}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10%'}}>
            <InfoIcon style={{fill: 'blue'}}/>
        </Box>
        <TextField
            value={props.title}
            sx={{width: '50%', mr: '.5rem'}}
            InputProps={{
                readOnly: true,
              }}
        />
        <TextField
            value={props.balance}
            sx={{width: '25%', mr: '.5rem'}}
            label='Balance'
            InputProps={{
                readOnly: true,
              }}
        />
        <TextField
            label='Percentage'

            value={props.percentage}
            sx={{width: '15%'}}
            InputProps={{
                readOnly: true,
                endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
              }}
        />
    </Box>
    
    
}

const TokenomicSummary: React.FC<IData<ITokenomics>> = (props) => {
    let data = props.data;
    let tokenHolderBalance = data.tokenHolders.map((i: ITokenHolder) => i.balance).reduce((sum, current) => sum + current, 0);
    let tokenomics = [
        {title: 'Token holders', balance: tokenHolderBalance, percentage: percentage(tokenHolderBalance / data.tokenAmount, 2, false)},
        {title: 'Unassigned tokens (Treasury)', balance: tokenHolderBalance, percentage: percentage(tokenHolderBalance / data.tokenAmount, 2, false)},

    ]
    return <Box>
        {tokenomics.map((i: any) => {
            return <TokenomicsRow {...i}/>
        })}
    </Box>
}

export default TokenomicSummary;