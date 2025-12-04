
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROPOSALS as INITIAL_PROPOSALS, COUNCILS as INITIAL_COUNCILS, USERS as INITIAL_USERS } from '../data/mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [proposals, setProposals] = useState([]);
    const [councils, setCouncils] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Load from local storage or fallback to mock data
        const storedProposals = localStorage.getItem('proposals');
        const storedCouncils = localStorage.getItem('councils');
        const storedUsers = localStorage.getItem('users');

        if (storedProposals) {
            setProposals(JSON.parse(storedProposals));
        } else {
            setProposals(INITIAL_PROPOSALS);
        }

        if (storedCouncils) {
            setCouncils(JSON.parse(storedCouncils));
        } else {
            setCouncils(INITIAL_COUNCILS);
        }

        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            setUsers(INITIAL_USERS);
        }
    }, []);

    // Sync with local storage whenever data changes
    useEffect(() => {
        if (proposals.length > 0) localStorage.setItem('proposals', JSON.stringify(proposals));
    }, [proposals]);

    useEffect(() => {
        if (councils.length > 0) localStorage.setItem('councils', JSON.stringify(councils));
    }, [councils]);

    // CRUD for Proposals
    const addProposal = (newProposal) => {
        const proposal = {
            ...newProposal,
            id: Date.now(), // Simple ID generation
            createdAt: new Date().toISOString().split('T')[0],
            reviews: [],
            files: []
        };
        setProposals(prev => [proposal, ...prev]);
        return proposal;
    };

    const updateProposal = (id, updatedData) => {
        setProposals(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    const deleteProposal = (id) => {
        setProposals(prev => prev.filter(p => p.id !== id));
    };

    const getProposalById = (id) => {
        return proposals.find(p => p.id === parseInt(id));
    };

    // CRUD for Councils
    const addCouncil = (newCouncil) => {
        const council = {
            ...newCouncil,
            id: Date.now(),
            members: newCouncil.members || []
        };
        setCouncils(prev => [council, ...prev]);
    };

    const updateCouncil = (id, updatedData) => {
        setCouncils(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    };

    const deleteCouncil = (id) => {
        setCouncils(prev => prev.filter(c => c.id !== id));
    };

    // Logic for Reviews & Assignments
    const assignCouncilToProposal = (proposalId, councilId) => {
        setProposals(prev => prev.map(p =>
            p.id === proposalId ? { ...p, councilId: parseInt(councilId), status: 'UNDER_REVIEW' } : p
        ));
    };

    const addReview = (proposalId, review) => {
        setProposals(prev => prev.map(p => {
            if (p.id === proposalId) {
                const newReviews = [...(p.reviews || []), review];
                let newStatus = p.status;

                // Automatic Status Transition Logic
                if (p.councilId) {
                    const council = councils.find(c => c.id === p.councilId);
                    if (council && council.members && council.members.length > 0) {
                        // Check if all members have reviewed
                        // We assume 1 review per member. 
                        // In a real app, we'd check unique expertIds against council memberIds.
                        if (newReviews.length >= council.members.length) {
                            const totalScore = newReviews.reduce((sum, r) => sum + r.score, 0);
                            const avgScore = totalScore / newReviews.length;

                            if (avgScore >= 50) {
                                newStatus = 'APPROVED';
                            } else {
                                newStatus = 'REJECTED';
                            }
                        }
                    }
                }

                return { ...p, reviews: newReviews, status: newStatus };
            }
            return p;
        }));
    };

    return (
        <DataContext.Provider value={{
            proposals,
            councils,
            addProposal,
            updateProposal,
            deleteProposal,
            getProposalById,
            addCouncil,
            updateCouncil,
            deleteCouncil,
            assignCouncilToProposal,
            addReview,
            users
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
