export default {
    user: {
        create: 'CREATE_AUTH_USER',
        read: 'READ_AUTH_USER',
        findByEmail: 'FIND_BY_EMAIL_AUTH_USER'
    },
    token: {
        create: 'CREATE_TOKEN',
        findByUserId: 'FIND_BY_USER_ID_TOKEN',
        findByValue: 'FIND_BY_VALUE_TOKEN'
    },
    author: {
        create: 'CREATE_AUTHOR',
        read: 'READ_AUTHOR',
    },
    blog: {
        create: 'CREATE_BLOG',
        read: 'READ_BLOG',
    },
    post: {
        create: 'CREATE_POST',
        read: 'READ_POST',
    },
    country: {
        create: 'CREATE_COUNTRY',
        read: 'READ_COUNTRY',
    },
};