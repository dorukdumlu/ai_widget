# Contributing to AI Chatbot Widget

Thank you for your interest in contributing to the AI Chatbot Widget project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub Issues tab to report bugs or request features
- Search existing issues before creating a new one
- Provide detailed information about the issue
- Include steps to reproduce bugs

### Suggesting Enhancements
- Use GitHub Discussions for feature requests
- Describe the enhancement clearly
- Explain why it would be useful
- Consider the impact on existing functionality

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📋 Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing code structure

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove)
- Keep the first line under 50 characters
- Add more details in the body if needed

### Testing
- Test your changes thoroughly
- Test on different browsers and devices
- Verify mobile responsiveness
- Check for accessibility issues

## 🏗️ Project Structure

```
ai-chatbot-widget/
├── pages/           # Next.js pages and API routes
├── public/          # Static assets
├── configs/         # Configuration files
├── lib/            # Utility functions
├── components/     # React components
└── data/          # Data storage
```

## 🔧 Development Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/yourusername/ai-chatbot-widget.git
cd ai-chatbot-widget
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp env.example .env.local
# Edit .env.local with your configuration
```

4. **Start development server**
```bash
npm run dev
```

## 📝 Pull Request Process

### Before Submitting
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] No console errors or warnings

### PR Description
- Clearly describe what the PR does
- Reference any related issues
- Include screenshots for UI changes
- List any breaking changes

### Review Process
- Maintainers will review your PR
- Address any feedback promptly
- Keep PRs focused and atomic
- Respond to review comments

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment Information**
   - Operating System
   - Browser and version
   - Node.js version
   - Project version

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable

3. **Additional Context**
   - Error messages
   - Console logs
   - Network requests
   - Any workarounds found

## ✨ Feature Requests

When suggesting features:

1. **Problem Description**
   - What problem does this solve?
   - Who would benefit from this?
   - Current workarounds

2. **Proposed Solution**
   - How should it work?
   - Any design considerations?
   - Implementation ideas

3. **Additional Context**
   - Related issues or discussions
   - Examples from other projects
   - Priority level

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Include usage examples
- Update README if needed

### API Documentation
- Document new API endpoints
- Include request/response examples
- Specify error codes
- Update API documentation

## 🧪 Testing

### Manual Testing
- Test all user flows
- Verify responsive design
- Check accessibility
- Test error handling

### Automated Testing
- Unit tests for utilities
- Integration tests for APIs
- E2E tests for critical flows
- Performance testing

## 🚀 Deployment

### Staging
- Test changes in staging environment
- Verify all features work
- Check performance impact
- Validate analytics

### Production
- Follow deployment checklist
- Monitor for issues
- Update documentation
- Announce changes

## 📞 Getting Help

- **GitHub Discussions**: For questions and discussions
- **Issues**: For bug reports and feature requests
- **Email**: For security issues or private matters

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation
- GitHub contributors page

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the AI Chatbot Widget project! 🎉
