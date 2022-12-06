import { useEffect, useState } from 'react'
import gClient from '../../Client';
import './StatusIndicator.css'

function StatusIndicator() {
    const [status, setStatusHTML] = useState(<>Offline mode</>);

    useEffect(() => {
        const setStatusIndicatorText = (status: string) => {
            setStatusHTML(<>{ status }</>);
        }

        const handleCount = (count: number) => {
            if (count > 0) {
                document.title = `Piano (${count})`;

                setStatusHTML(<><span className='number'>{ count }</span> { count == 1 ? 'person is' : 'people are' } playing</>);
            } else {
                document.title = 'Multiplayer Piano';
            }
        }

        gClient.on('status', setStatusIndicatorText);

        gClient.on('count', handleCount);

        return () => {
            gClient.off('status', setStatusIndicatorText);
            gClient.off('count', handleCount);
        }
    });

    return (
        <div id="status">{ status }</div>
    )
}

export default StatusIndicator
