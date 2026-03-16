# Chapter 3: Building a Scalable UI Framework

**Create flexible, tool-agnostic UI frameworks using proven design principles.**

Building on the previous chapter, this section guides you through designing a modular UI framework using proven design principles. You'll integrate data-driven testing, maintain flexibility, and ensure your framework is ready for real-world complexity.

This chapter provides two projects to demonstrate the progression from foundational concepts to advanced implementation patterns.

---

## 🎯 Why These Locators? Architecture Over Sophistication

**This chapter intentionally uses a mix of locator strategies**—from simple CSS selectors (`#user-name`, `.shopping_cart_badge`) to Playwright-specific features like `:below()`—to demonstrate a fundamental principle:

> **Well-architected frameworks derive their scalability from structural design patterns, not from locator sophistication.**

### The Core Lesson

You'll see selectors ranging from basic to tool-specific because we're proving that **architecture matters more than implementation details**. The framework's scalability comes from:

- **BasePage abstraction** isolating browser interactions
- **Page Object Model** encapsulating element location logic  
- **Factory Pattern** enabling flexible page creation
- **Singleton Pattern** managing shared resources consistently

These architectural patterns allow you to use ANY locator strategy—simple, complex, or tool-specific—without compromising maintainability or migration-readiness.

### Validation Through Migration

**Chapter 4 proves this works**: When we migrate from Playwright to Puppeteer, the framework's architecture allows seamless adaptation:
- Simple CSS selectors work unchanged across tools
- Tool-specific selectors (like `:below()`) adapt through the abstraction layer
- Tests remain completely untouched regardless of selector changes

The abstraction layers protect your tests from implementation details, proving that **good architecture enables flexibility** in selector choices.

### The Strategic Message

This is how enterprise frameworks operate in the real world: you use the right tool features for the job, and proper architecture makes those choices safe, maintainable, and migration-ready.

**Scalability comes from structure, not from selector perfection.**

---

## 🎯 Learning Objectives

By the end of this chapter, you will understand:
- Page Object Model (POM) implementation with Playwright
- Browser context management and singleton patterns
- Factory patterns for page creation
- Logging and error handling in UI tests
- Environment configuration for different test environments
- Advanced error handling and recovery mechanisms
- Scalable test architecture patterns

## 📚 Project Structure Overview

This chapter contains two projects representing different levels of complexity:

```
chapter3/
├── generic-ui-framework-foundational/    # Start here - Foundation concepts
│   ├── data/                            # Test data files
│   ├── pages/                           # Page Objects (Basic POM)
│   ├── tests/                           # Test specifications
│   ├── utils/                           # Utilities (Browser, Logging, Factory)
│   └── package.json                     # Dependencies
│
└── generic-ui-framework/                # Advanced concepts and patterns
    ├── config/                          # Environment configurations
    ├── data/                           # Test data files
    ├── pages/                          # Enhanced Page Objects
    ├── tests/                          # Advanced test patterns
    ├── utils/                          # Advanced utilities with error handling
    └── package.json                    # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Basic understanding of TypeScript/JavaScript
- Familiarity with web applications and DOM manipulation

---

## 📖 Part 1: Foundational Framework

**📁 Directory:** `generic-ui-framework-foundational/`

### Overview

The foundational framework introduces core concepts of UI test automation with Playwright. This is your starting point for learning scalable test architecture.

### Key Concepts Covered

1. **Page Object Model (POM)** - Encapsulating page interactions
2. **Browser Context Management** - Singleton pattern for browser instances
3. **Factory Pattern** - Dynamic page object creation
4. **Basic Logging** - Test execution tracking
5. **Test Data Management** - External JSON data files

### Project Structure

```
generic-ui-framework-foundational/
├── data/
│   ├── users.json              # User credentials and test data
│   └── products.json           # Product-related test data
├── pages/
│   ├── basePage.ts            # Base page with common methods
│   ├── loginPage.ts           # Login page interactions
│   └── inventoryPage.ts       # Inventory page interactions
├── tests/
│   ├── login.spec.ts          # Login functionality tests
│   └── inventory.spec.ts      # Inventory functionality tests
├── utils/
│   ├── browserContext.ts     # Singleton browser management
│   ├── logging.ts            # Winston logger configuration
│   └── pageFactory.ts        # Factory for creating page objects
├── playwright.config.ts      # Playwright configuration
└── package.json             # Project dependencies
```

### Installation & Setup

1. **Navigate to the foundational framework:**
   ```bash
   cd generic-ui-framework-foundational
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Running Tests

1. **Run all tests:**
   ```bash
   npx playwright test
   ```

2. **Run tests in headed mode:**
   ```bash
   npx playwright test --headed
   ```

3. **Run specific test file:**
   ```bash
   npx playwright test tests/login.spec.ts
   ```

4. **View test report:**
   ```bash
   npx playwright show-report
   ```

### Key Components Explained

#### 1. Base Page (`pages/basePage.ts`)
```typescript
export class BasePage {
    public page: Page;
    
    async init() {
        this.page = await BrowserContext.getInstance();
    }
    
    async click(selector: string) {
        await this.page.click(selector);
    }
    
    async fill(selector: string, text: string) {
        await this.page.fill(selector, text);
    }
    // ... other common methods
}
```

#### 2. Page Factory (`utils/pageFactory.ts`)
```typescript
export class PageFactory {
    static getPage(pageName: string): BasePage {
        switch (pageName) {
            case 'LoginPage':
                return new LoginPage();
            case 'InventoryPage':
                return new InventoryPage();
            default:
                throw new Error(`Page ${pageName} not found`);
        }
    }
}
```

#### 3. Browser Context Management (`utils/browserContext.ts`)
```typescript
class BrowserContext {
    private static instance: Page;
    
    static async getInstance(): Promise<Page> {
        if (!BrowserContext.instance) {
            // Create new browser instance
        }
        return BrowserContext.instance;
    }
}
```

### Test Examples

#### Login Test
```typescript
test('standard user can login', async () => {
    await loginPage.navigate('/');
    expect(await loginPage.login(
        users.standardUser.username, 
        users.standardUser.password
    )).toBeTruthy();
    expect(await loginPage.page.url()).toContain('/inventory.html');
});
```

---

## 🔧 Part 2: Advanced Framework

**📁 Directory:** `generic-ui-framework/`

### Overview

The advanced framework builds upon foundational concepts and introduces sophisticated patterns for enterprise-level test automation.

### Advanced Concepts Covered

1. **Environment Configuration** - Multi-environment support
2. **Advanced Error Handling** - Custom error types and recovery
3. **Enhanced Logging** - Structured logging with context
4. **Test Data Strategies** - Dynamic data management
5. **Retry Mechanisms** - Smart retry logic
6. **Browser Management** - Advanced context handling

### Enhanced Project Structure

```
generic-ui-framework/
├── config/
│   └── environments.ts        # Multi-environment configuration
├── data/
│   ├── users.json            # User data with multiple profiles
│   └── products.json         # Comprehensive product data
├── pages/
│   ├── basePage.ts          # Enhanced base page with error handling
│   ├── examplePage.ts       # Advanced page patterns
│   ├── loginPage.ts         # Enhanced login page
│   └── inventoryPage.ts     # Advanced inventory operations
├── tests/
│   ├── login.spec.ts        # Comprehensive login tests
│   ├── inventory.spec.ts    # Advanced inventory tests
│   └── exampleErrorHandling.spec.ts  # Error handling examples
├── utils/
│   ├── browserContext.ts    # Advanced browser management
│   ├── errors.ts           # Custom error types
│   ├── exampleErrorHandling.ts  # Error handling utilities
│   ├── logging.ts          # Enhanced logging system
│   └── pageFactory.ts      # Advanced factory with error handling
└── playwright.config.ts    # Advanced Playwright configuration
```

### Installation & Setup

1. **Navigate to the advanced framework:**
   ```bash
   cd generic-ui-framework
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Running Advanced Tests

1. **Run tests in different environments:**
   ```bash
   # Production environment (default)
   npx playwright test
   
   # Development environment
   TEST_ENV=dev npx playwright test
   
   # Staging environment  
   TEST_ENV=staging npx playwright test
   ```

2. **Run tests with error handling:**
   ```bash
   npx playwright test tests/exampleErrorHandling.spec.ts
   ```

### Advanced Features

#### 1. Environment Configuration
```typescript
export const environments = {
  dev: {
    baseUrl: "https://dev.saucedemo.com",
    username: "",
    password: "",
    testDataFiles: ["../data/product.json","../data/users.json"],
  },
  prod: {
    baseUrl: "https://www.saucedemo.com", 
    username: users.standardUser.username,
    password: users.standardUser.password,
    testDataFiles: ["../data/product.json", "../data/users.json"],
  }
};
```

#### 2. Custom Error Handling
```typescript
export class PageNotLoadedException extends Error {
    constructor(pageName: string) {
        super(`Page ${pageName} failed to load properly`);
        this.name = 'PageNotLoadedException';
    }
}
```

#### 3. Enhanced Logging
```typescript
logger.info('Test started', { 
    testName: 'login test', 
    environment: process.env.TEST_ENV,
    timestamp: new Date().toISOString()
});
```

---

## 🧪 Test Patterns and Best Practices

### 1. Page Object Model Structure
```typescript
// Good POM structure
export class LoginPage extends BasePage {
    // Locators
    private readonly usernameInput = '#user-name';
    private readonly passwordInput = '#password';
    private readonly loginButton = '#login-button';
    
    // Actions
    async login(username: string, password: string): Promise<boolean> {
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
        return this.isLoginSuccessful();
    }
    
    // Verifications
    private async isLoginSuccessful(): Promise<boolean> {
        return this.page.url().includes('/inventory.html');
    }
}
```

### 2. Test Data Management
```typescript
// tests/login.spec.ts
import users from '../data/users.json';

test('multiple user types can login', async () => {
    for (const userType of Object.keys(users)) {
        const user = users[userType];
        await loginPage.login(user.username, user.password);
        expect(await loginPage.page.url()).toContain('/inventory.html');
        await loginPage.logout(); // Reset for next iteration
    }
});
```

### 3. Error Handling Pattern
```typescript
test('handle login failures gracefully', async () => {
    try {
        await loginPage.login('invalid_user', 'wrong_password');
    } catch (error) {
        if (error instanceof LoginFailedException) {
            logger.warn('Expected login failure occurred');
            expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
        } else {
            throw error; // Re-throw unexpected errors
        }
    }
});
```

## 📊 Test Execution and Reporting

### Configuration Options

#### Playwright Config Features
- **Multi-browser support**: Chrome, Firefox, Safari
- **Parallel execution**: Configurable worker processes
- **Retry mechanisms**: Environment-specific retry counts
- **Trace collection**: Debug failed tests with traces
- **Screenshot on failure**: Automatic failure documentation

### Viewing Results

1. **HTML Report:**
   ```bash
   npx playwright show-report
   ```

2. **Trace Viewer:**
   ```bash
   npx playwright show-trace trace.zip
   ```

3. **Debug Mode:**
   ```bash
   npx playwright test --debug
   ```

## 🔄 Learning Path Progression

### Phase 1: Master the Foundational Framework
1. Understand Browser Context management
2. Implement basic Page Object Model
3. Create simple test scenarios
4. Practice with Factory pattern
5. Explore basic logging

### Phase 2: Advance to Enhanced Framework  
1. Implement environment configurations
2. Add sophisticated error handling
3. Create advanced test patterns
4. Implement retry mechanisms
5. Master advanced debugging techniques

### Phase 3: Extend and Customize
1. Add new page objects for different applications
2. Implement custom error types
3. Create advanced test data strategies
4. Build cross-browser test suites
5. Implement CI/CD integration

## 🛠️ Common Commands

### Development Commands
```bash
# Install dependencies
npm install

# Run tests in different modes
npx playwright test                    # All tests
npx playwright test --headed          # Visual mode
npx playwright test --debug           # Debug mode
npx playwright test tests/login.spec.ts  # Specific test

# Environment-specific runs
TEST_ENV=dev npx playwright test      # Development
TEST_ENV=staging npx playwright test  # Staging

# Generate and view reports
npx playwright show-report            # HTML report
npx playwright show-trace trace.zip   # Trace viewer
```

### Debugging Commands
```bash
# Run with browser visible
npx playwright test --headed

# Step through tests
npx playwright test --debug

# Record new tests
npx playwright codegen https://www.saucedemo.com
```

## 🎓 Best Practices Summary

1. **Start with Foundational**: Master basic concepts before advancing
2. **Use Page Objects**: Encapsulate page interactions properly
3. **Manage Test Data**: Use external JSON files for test data
4. **Handle Errors Gracefully**: Implement proper error handling and recovery
5. **Log Strategically**: Use structured logging for debugging
6. **Environment Awareness**: Design tests to work across environments
7. **Maintain Clean Code**: Follow TypeScript best practices
8. **Test Independently**: Ensure tests can run in isolation

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Winston Logging](https://github.com/winstonjs/winston)

---

**Ready to start your UI automation journey? Begin with the foundational framework and progressively advance to the enhanced version! 🚀**
