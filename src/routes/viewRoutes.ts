import { Router } from 'express';

import viewController from '../controllers/viewController';
import authController from '../controllers/authController';

const router = Router();

// ▼ Public Routes //
router.get('/', viewController.home);
router.get('/event/:id', viewController.eventDetail);
router.get('/search', viewController.search);
router.get('/search-result', viewController.searchResult);
router.get('/start', viewController.start);
router.get('/login', viewController.login);
router.get('/signup', viewController.signup);

// ▼ Private Routes //
router.get('/me', authController.protect, viewController.me);
router.get('/profile', viewController.profile);
router.get('/user/:id/edit', viewController.userEdit);
router.get('/event-preview', viewController.eventPreview);
router.get('/event/:id/edit', viewController.eventEdit);

module.exports = router;
