import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { RecordsResponse } from './types';
import { formatDate } from './helpers';
import Pagination from './Pagination';
import { Link } from 'react-router-dom'

const BASE_URL = 'http://localhost:8080';

const Records = () => {
    const [recordsResponse, setRecordsResponse] = useState<RecordsResponse>();
    const [activePage, setActivePage] = useState(0);

    console.log(recordsResponse);
    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
            .then(response => setRecordsResponse(response.data));
    }, [activePage]);

    const handlePaginationChange = (index: number) => {
        setActivePage(index)
    }

    return (
        <div className="page-container">
            <div className="filters-container records-actions">
                <Link to="/charts">
                    <button className="action-filters">
                        VER GRÁFICOS
                    </button>
                </Link>
            </div>
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsResponse?.content.map(records => (
                        <tr key={records.id}>
                            <td>{formatDate(records.moment)}</td>
                            <td>{records.name}</td>
                            <td>{records.age}</td>
                            <td className="text-secondary">{records.gamePlatform}</td>
                            <td>{records.genreName}</td>
                            <td className="text-primary">{records.gameTitle}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                activePage={activePage}
                goToPage={handlePaginationChange}
                totalPages={recordsResponse?.totalPages}
            />            
        </div>
    );
}

export default Records;