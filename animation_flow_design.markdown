# Animation Flow Design for Chemical Equation Balancer

This document outlines the design for an interactive HTML animation that teaches users how to balance chemical equations step-by-step, focusing on equations where all molecules contain polyatomic ions. The target audience is Year 10-11 science students in NSW.

## 1. Core Features

*   **Equation Selection:** Users can choose from a predefined list of 30 chemical equations, all involving polyatomic ions (e.g., SO4, NO3, CO3, NH4, OH).
*   **Interactive Balancing:** Users can input coefficients to balance the selected equation.
*   **Real-time Feedback:** A four-column table (Element, Reactants, Products, Balanced?) shows element counts, updated dynamically as coefficients change.
*   **Balancing Verification:** The application verifies balance by matching element counts, with feedback referencing polyatomic ions for guidance.
*   **Step-by-Step Guidance:** The animation shows element count changes, with status messages suggesting coefficient adjustments based on ions and elements.

## 2. User Interface (UI) and User Experience (UX)

### 2.1. Main Layout

The interface includes:

*   **Equation Selection Area:**
    *   A dropdown menu (`<select>`) lists the 30 equations.
    *   The selected equation appears in the balancing area.
*   **Balancing Area:**
    *   Displays the equation with input fields (`<input type="number">`, min="1") for coefficients.
    *   Reactants and products are separated by an arrow (→).
    *   Example: `_ NaOH + _ HCl → _ NaCl + _ H2O` (_ = input field).
*   **Atom Count Display Area:**
    *   A table shows elements (e.g., C, O, Na) with columns: Element, Reactants, Products, Balanced?.
    *   Counts update in real-time.
    *   Indicators (red for unbalanced, green for balanced) show balance status.
*   **Status/Feedback Area:**
    *   Displays messages like "Equation is balanced!" or "Balance Cl: 1 on reactants, 2 on products. Ensure CO3 elements match: check C, O."
*   **Controls Area:**
    *   "Reset Equation" button: Resets coefficients to 1.

### 2.2. Interaction Flow

1.  **Start:** User sees the equation selection dropdown.
2.  **Select Equation:** User chooses an equation.
3.  **Display Equation:** Equation appears with default coefficients (1).
4.  **Initial Atom Counts:** Table shows element counts for the unbalanced equation.
5.  **User Input:**
    *   User adjusts coefficients.
    *   Table updates element counts and balance status.
    *   Status message provides guidance (e.g., "Balance Cl by increasing HCl").
6.  **Balancing Achieved:** When all elements match:
    *   Success message appears.
    *   Equation may be highlighted.
7.  **Reset:** "Reset Equation" resets coefficients to 1.
8.  **Change Equation:** User can select a new equation.

## 3. Step-by-Step Animation Aspect

*   **Immediate Feedback:** Table updates show element count changes.
*   **Element Focus:** Table lists elements, simplifying balancing.
*   **Ion Guidance:** Feedback references polyatomic ions (e.g., "Ensure SO4 elements match").
*   **Iterative Learning:** Supports trial-and-error with clear guidance.

## 4. Technical Implementation Details (HTML, CSS, JavaScript)

*   **HTML:** Semantic structure (header, main, section, footer, form, input, select, button, table).
*   **CSS:** Clear, responsive styling.
*   **JavaScript:**
    *   **Equation Data:** 30 equations as an array of objects (string, name).
    *   **Event Listeners:** For equation selector, coefficient inputs, buttons.
    *   **Parsing:** Breaks molecules into elements, recognizing polyatomic ions for feedback.
    *   **Counting:** Calculates element counts for reactants and products.
    *   **DOM Updates:** Refreshes equation, table, and status messages.
    *   **Validation:** Checks element balance, with ion-based feedback.

## 5. Equations List

The 30 equations involve polyatomic ions and increase in difficulty. See `chemical_equations.txt`.

## 6. Future Enhancements

*   **Hints:** Specific suggestions (e.g., "Set HCl to 2").
*   **Progress Tracking:** For learning modules.
*   **Visuals:** Icons for ions or elements.

This design ensures an intuitive tool for balancing polyatomic ion equations.