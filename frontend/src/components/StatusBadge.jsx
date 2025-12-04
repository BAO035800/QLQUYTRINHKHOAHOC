
import React from 'react';
import { PROPOSAL_STATUS } from '../data/mockData';

const StatusBadge = ({ status }) => {
    let className = 'badge badge-gray';
    let label = status;

    switch (status) {
        case PROPOSAL_STATUS.DRAFT:
            className = 'badge badge-gray';
            label = 'Nháp';
            break;
        case PROPOSAL_STATUS.SUBMITTED:
            className = 'badge badge-blue';
            label = 'Đã gửi';
            break;
        case PROPOSAL_STATUS.UNDER_REVIEW:
            className = 'badge badge-yellow';
            label = 'Đang đánh giá';
            break;
        case PROPOSAL_STATUS.APPROVED:
            className = 'badge badge-green';
            label = 'Đã duyệt';
            break;
        case PROPOSAL_STATUS.WAITING_CONTRACT:
            className = 'badge badge-yellow';
            label = 'Chờ ký HĐ';
            break;
        case PROPOSAL_STATUS.IN_PROGRESS:
            className = 'badge badge-blue';
            label = 'Đang thực hiện';
            break;
        case PROPOSAL_STATUS.ACCEPTANCE_BASE:
            className = 'badge badge-yellow';
            label = 'Nghiệm thu cơ sở';
            break;
        case PROPOSAL_STATUS.ACCEPTANCE_OFFICIAL:
            className = 'badge badge-yellow';
            label = 'Nghiệm thu chính thức';
            break;
        case PROPOSAL_STATUS.COMPLETED:
            className = 'badge badge-green';
            label = 'Đã hoàn thành';
            break;
        case PROPOSAL_STATUS.REJECTED:
            className = 'badge badge-red';
            label = 'Không đạt';
            break;
        default:
            break;
    }

    return <span className={className}>{label}</span>;
};

export default StatusBadge;
