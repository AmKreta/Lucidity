import { useTheme } from '@emotion/react';
import './chip.styles.css';

interface IChip{
    children:React.ReactNode
}


export const Chip:React.FC<IChip> = function({children}){
    const theme:any = useTheme();

    return <div className='chip'style={{background: theme.palette.grey['900'], color:theme.palette.success.main}}>
        {children}
    </div>
}