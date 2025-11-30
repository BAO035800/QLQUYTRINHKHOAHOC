// Mock document service with localStorage persistence

const DOCUMENTS_STORAGE_KEY = 'mock_documents';

// Initial mock data
const initialDocuments = [
    {
        id: 1,
        name: 'Thuyết minh đề tài AI-2024.pdf',
        type: 'PDF',
        category: 'Thuyết minh',
        uploadDate: '2024-11-20',
        size: '2.4 MB',
        uploadedBy: 'Nguyễn Văn A',
        relatedTo: { type: 'project', id: 1, title: 'Nghiên cứu Deep Learning' },
        tags: ['AI', 'Deep Learning', 'Thuyết minh'],
        permissions: 'public'
    },
    {
        id: 2,
        name: 'Báo cáo tiến độ Q4-2024.docx',
        type: 'DOCX',
        category: 'Báo cáo',
        uploadDate: '2024-12-01',
        size: '1.1 MB',
        uploadedBy: 'Trần Thị B',
        relatedTo: { type: 'project', id: 2, title: 'Blockchain trong Tài chính' },
        tags: ['Báo cáo', 'Tiến độ'],
        permissions: 'restricted'
    },
    {
        id: 3,
        name: 'Chương trình hội thảo AI-2024.pdf',
        type: 'PDF',
        category: 'Hội thảo',
        uploadDate: '2024-11-25',
        size: '1.5 MB',
        uploadedBy: 'Lê Văn C',
        relatedTo: { type: 'conference', id: 1, title: 'Hội thảo AI' },
        tags: ['Hội thảo', 'Chương trình'],
        permissions: 'public'
    },
    {
        id: 4,
        name: 'Bài báo - Software Bug Detection.pdf',
        type: 'PDF',
        category: 'Bài báo',
        uploadDate: '2024-10-15',
        size: '3.2 MB',
        uploadedBy: 'Nguyễn Văn A',
        relatedTo: { type: 'publication', id: 1, title: 'Deep Learning for Bug Detection' },
        tags: ['Bài báo', 'IEEE', 'Publication'],
        permissions: 'public'
    },
    {
        id: 5,
        name: 'Hợp đồng kinh tế 2024.pdf',
        type: 'PDF',
        category: 'Hợp đồng',
        uploadDate: '2024-01-10',
        size: '0.8 MB',
        uploadedBy: 'Admin',
        relatedTo: null,
        tags: ['Hợp đồng', 'Kinh tế'],
        permissions: 'restricted'
    }
];

// Helper functions
const getDocuments = () => {
    const stored = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(initialDocuments));
    return initialDocuments;
};

export const documentService = {
    // Get all documents
    getAll: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getDocuments());
            }, 500);
        });
    },

    // Get document by ID
    getById: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const documents = getDocuments();
                const document = documents.find(d => d.id === parseInt(id));
                if (document) {
                    resolve(document);
                } else {
                    reject(new Error('Không tìm thấy tài liệu'));
                }
            }, 500);
        });
    },

    // Create new document (mock upload)
    create: async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const documents = getDocuments();
                const newId = documents.length > 0 ? Math.max(...documents.map(d => d.id)) + 1 : 1;

                const newDocument = {
                    id: newId,
                    uploadDate: new Date().toISOString().split('T')[0],
                    permissions: 'public',
                    ...data
                };

                const updatedDocuments = [newDocument, ...documents];
                localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(updatedDocuments));
                resolve(newDocument);
            }, 1000);
        });
    },

    // Delete document
    delete: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const documents = getDocuments();
                const filtered = documents.filter(d => d.id !== parseInt(id));
                localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(filtered));
                resolve();
            }, 500);
        });
    },

    // Reset to initial data
    resetData: () => {
        localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(initialDocuments));
    }
};
