import React from 'react';
import EditIcon from "../../../../../assets/Images/Icons/Modifications/Edit.png";
import DeleteIcon from "../../../../../assets/Images/Icons/Modifications/Delete.png";
import PasswordIcon from "../../../../../assets/Images/Icons/Modifications/Password.png";
import Button from '../../../../../shared/components/UI/Button/Button';
import Table from "../../../../../shared/components/UI/Table/Table";



const UserListTable = ({
    columns = [],
    data = [],
    onViewClick = () => { },
    onEditClick = () => { },
    onDeleteClick = () => { },
    onPasswordClick = () => { },
    showActions = true
}) => {
    if (!columns.length) return null;

    const renderActions = (row) => (
        <div className="flex gap-2 items-center">
            <Button variant="icon" size="icon" onClick={() => onEditClick(row)}>
                <img src={EditIcon} alt="Edit"  />
            </Button>

            <Button variant="icon" size="icon" onClick={() => onDeleteClick(row)}>
                <img src={DeleteIcon} alt="Delete"  />
            </Button>

            <Button variant="icon" size="icon" onClick={() => onPasswordClick(row)}>
                <img src={PasswordIcon} alt="Password"  />
            </Button>
        </div>
    );

    return (

        <Table
            columns={columns}
            data={data}
            actions={renderActions}
            emptyMessage="No users found"
        />

    );
};

export default UserListTable;
