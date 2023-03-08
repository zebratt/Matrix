export default [
  { path: '/notes', component: 'notes' },
  {
    path: '/dashboard',
    component: 'dashboard',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
];
