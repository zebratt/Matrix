export default [
  {
    path: '/',
    redirect: '/dashboard',
  },
  { path: '/notes', component: 'notes' },
  {
    path: '/dashboard',
    component: 'dashboard',
  },
  {
    path: '/mocks',
    component: 'mocks',
  },
];
