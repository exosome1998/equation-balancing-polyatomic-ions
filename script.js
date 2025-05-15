document.addEventListener('DOMContentLoaded', () => {
    const equationSelect = document.getElementById('equation-select');
    const equationDisplay = document.getElementById('equation-display');
    const atomCountsTableBody = document.getElementById('atom-counts-table').getElementsByTagName('tbody')[0];
    const statusMessage = document.getElementById('status-message');
    const resetButton = document.getElementById('reset-button');

    // Polyatomic ions for feedback
    const polyatomicIons = [
        { formula: 'SO4', elements: { S: 1, O: 4 }, display: 'SO<sub>4</sub>' },
        { formula: 'NO3', elements: { N: 1, O: 3 }, display: 'NO<sub>3</sub>' },
        { formula: 'CO3', elements: { C: 1, O: 3 }, display: 'CO<sub>3</sub>' },
        { formula: 'NH4', elements: { N: 1, H: 4 }, display: 'NH<sub>4</sub>' },
        { formula: 'OH', elements: { O: 1, H: 1 }, display: 'OH' },
        { formula: 'Cr2O7', elements: { Cr: 2, O: 7 }, display: 'Cr<sub>2</sub>O<sub>7</sub>' }
    ];

    // Equations with polyatomic ions
    const equations = [
        { id: 0, string: "NaOH + HCl → NaCl + H2O", name: "Sodium Hydroxide + Hydrochloric Acid" },
        { id: 1, string: "KOH + HNO3 → KNO3 + H2O", name: "Potassium Hydroxide + Nitric Acid" },
        { id: 2, string: "Ca(OH)2 + HCl → CaCl2 + H2O", name: "Calcium Hydroxide + Hydrochloric Acid" },
        { id: 3, string: "NH4Cl + NaOH → NH3 + NaCl + H2O", name: "Ammonium Chloride + Sodium Hydroxide" },
        { id: 4, string: "Ba(OH)2 + H2SO4 → BaSO4 + H2O", name: "Barium Hydroxide + Sulfuric Acid" },
        { id: 5, string: "Na2CO3 + HCl → NaCl + H2O + CO2", name: "Sodium Carbonate + Hydrochloric Acid" },
        { id: 6, string: "(NH4)2SO4 + NaOH → Na2SO4 + NH3 + H2O", name: "Ammonium Sulfate + Sodium Hydroxide" },
        { id: 7, string: "K2CO3 + HNO3 → KNO3 + H2O + CO2", name: "Potassium Carbonate + Nitric Acid" },
        { id: 8, string: "CaCO3 + HCl → CaCl2 + H2O + CO2", name: "Calcium Carbonate + Hydrochloric Acid" },
        { id: 9, string: "Mg(OH)2 + H2SO4 → MgSO4 + H2O", name: "Magnesium Hydroxide + Sulfuric Acid" },
        { id: 10, string: "Na2SO4 + BaCl2 → BaSO4 + NaCl", name: "Sodium Sulfate + Barium Chloride" },
        { id: 11, string: "NH4NO3 → N2O + H2O", name: "Ammonium Nitrate Decomposition" },
        { id: 12, string: "(NH4)2CO3 → NH3 + H2O + CO2", name: "Ammonium Carbonate Decomposition" },
        { id: 13, string: "CuSO4 + NaOH → Cu(OH)2 + Na2SO4", name: "Copper(II) Sulfate + Sodium Hydroxide" },
        { id: 14, string: "AgNO3 + NaCl → AgCl + NaNO3", name: "Silver Nitrate + Sodium Chloride" },
        { id: 15, string: "CaCO3 + H2SO4 → CaSO4 + H2O + CO2", name: "Calcium Carbonate + Sulfuric Acid" },
        { id: 16, string: "KOH + (NH4)2SO4 → K2SO4 + NH3 + H2O", name: "Potassium Hydroxide + Ammonium Sulfate" },
        { id: 17, string: "Na2CO3 + CaCl2 → CaCO3 + NaCl", name: "Sodium Carbonate + Calcium Chloride" },
        { id: 18, string: "Fe(NO3)3 + NaOH → Fe(OH)3 + NaNO3", name: "Iron(III) Nitrate + Sodium Hydroxide" },
        { id: 19, string: "(NH4)2S + HCl → NH4Cl + H2S", name: "Ammonium Sulfide + Hydrochloric Acid" },
        { id: 20, string: "CuSO4 + (NH4)2S → CuS + (NH4)2SO4", name: "Copper(II) Sulfate + Ammonium Sulfide" },
        { id: 21, string: "Pb(NO3)2 + Na2SO4 → PbSO4 + NaNO3", name: "Lead(II) Nitrate + Sodium Sulfate" },
        { id: 22, string: "Ca(OH)2 + (NH4)2CO3 → CaCO3 + NH3 + H2O", name: "Calcium Hydroxide + Ammonium Carbonate" },
        { id: 23, string: "Al(NO3)3 + NaOH → Al(OH)3 + NaNO3", name: "Aluminum Nitrate + Sodium Hydroxide" },
        { id: 24, string: "(NH4)2SO4 + Ba(OH)2 → BaSO4 + NH3 + H2O", name: "Ammonium Sulfate + Barium Hydroxide" },
        { id: 25, string: "ZnSO4 + Na2CO3 → ZnCO3 + Na2SO4", name: "Zinc Sulfate + Sodium Carbonate" },
        { id: 26, string: "Cu(NO3)2 → CuO + NO2 + O2", name: "Copper(II) Nitrate Decomposition" },
        { id: 27, string: "(NH4)2Cr2O7 → N2 + Cr2O3 + H2O", name: "Ammonium Dichromate Decomposition" },
        { id: 28, string: "K2CO3 + Mg(NO3)2 → MgCO3 + KNO3", name: "Potassium Carbonate + Magnesium Nitrate" },
        { id: 29, string: "Fe2(SO4)3 + NaOH → Fe(OH)3 + Na2SO4", name: "Iron(III) Sulfate + Sodium Hydroxide" }
    ];

    let currentEquation = null;
    let coefficients = {};

    function populateEquationSelector() {
        equations.forEach(eq => {
            const option = document.createElement('option');
            option.value = eq.id;
            option.textContent = eq.name + " (" + eq.string + ")";
            equationSelect.appendChild(option);
        });
        equationSelect.value = '';
    }

    function parseMolecule(moleculeStr) {
        const atoms = {};
        const regex = /([A-Z][a-z]*)(\d*)/g;
        let remainingStr = moleculeStr;
        let match;

        // Handle polyatomic ions in parentheses, e.g., (NH4)2
        const parenRegex = /\(([A-Za-z0-9]+)\)(\d*)/g;
        while ((match = parenRegex.exec(moleculeStr)) !== null) {
            const ionFormula = match[1];
            const ionCount = match[2] ? parseInt(match[2]) : 1;
            const ion = polyatomicIons.find(ion => ion.formula === ionFormula);
            if (ion) {
                for (const element in ion.elements) {
                    atoms[element] = (atoms[element] || 0) + ion.elements[element] * ionCount;
                }
                remainingStr = remainingStr.replace(match[0], '');
            }
        }

        // Check for polyatomic ions not in parentheses
        polyatomicIons.forEach(ion => {
            const ionRegex = new RegExp(ion.formula + '(\\d*)', 'g');
            while ((match = ionRegex.exec(remainingStr)) !== null) {
                const ionCount = match[1] ? parseInt(match[1]) : 1;
                for (const element in ion.elements) {
                    atoms[element] = (atoms[element] || 0) + ion.elements[element] * ionCount;
                }
                remainingStr = remainingStr.replace(match[0], '');
            }
        });

        // Parse remaining elements
        while ((match = regex.exec(remainingStr)) !== null) {
            const element = match[1];
            const count = match[2] ? parseInt(match[2]) : 1;
            atoms[element] = (atoms[element] || 0) + count;
        }

        return atoms;
    }

    function formatMoleculeFormula(moleculeStr) {
        return moleculeStr.replace(/(\d+)/g, '<sub>$1</sub>');
    }

    function displayEquation(equationId) {
        currentEquation = equations.find(eq => eq.id == equationId);
        if (!currentEquation) return;

        equationDisplay.innerHTML = '';
        coefficients = {};
        const parts = currentEquation.string.split('→');
        const reactantsStr = parts[0].trim();
        const productsStr = parts[1].trim();

        let moleculeIndex = 0;

        function addMoleculesToDisplay(moleculesStr, type) {
            const molecules = moleculesStr.split('+').map(m => m.trim());
            molecules.forEach((mol, index) => {
                const coefficientInput = document.createElement('input');
                coefficientInput.type = 'number';
                coefficientInput.min = '1';
                coefficientInput.value = '1';
                coefficientInput.dataset.moleculeIndex = moleculeIndex;
                coefficientInput.dataset.moleculeType = type;
                coefficientInput.dataset.moleculeFormula = mol;
                coefficientInput.addEventListener('input', handleCoefficientChange);
                coefficients[moleculeIndex] = 1;

                const moleculeSpan = document.createElement('span');
                moleculeSpan.innerHTML = formatMoleculeFormula(mol);
                moleculeSpan.classList.add('molecule-formula');

                const moleculeContainer = document.createElement('div');
                moleculeContainer.classList.add('molecule');
                moleculeContainer.appendChild(coefficientInput);
                moleculeContainer.appendChild(moleculeSpan);

                equationDisplay.appendChild(moleculeContainer);
                moleculeIndex++;

                if (index < molecules.length - 1) {
                    const plusSpan = document.createElement('span');
                    plusSpan.textContent = '+';
                    plusSpan.classList.add('plus-sign');
                    equationDisplay.appendChild(plusSpan);
                }
            });
        }

        addMoleculesToDisplay(reactantsStr, 'reactant');

        const arrowSpan = document.createElement('span');
        arrowSpan.textContent = '→';
        arrowSpan.classList.add('arrow-sign');
        equationDisplay.appendChild(arrowSpan);

        addMoleculesToDisplay(productsStr, 'product');
        updateAtomCounts();
    }

    function handleCoefficientChange(event) {
        const index = event.target.dataset.moleculeIndex;
        const value = parseInt(event.target.value);
        if (isNaN(value) || value < 1) {
            coefficients[index] = 1;
            event.target.value = '1';
        } else {
            coefficients[index] = value;
        }
        updateAtomCounts();
    }

    function updateAtomCounts() {
        if (!currentEquation) return;

        const reactantCounts = {};
        const productCounts = {};
        const allElements = new Set();
        const ionContributions = {};

        // Parse molecules
        document.querySelectorAll('#equation-display input[type="number"]').forEach(input => {
            const molIndex = input.dataset.moleculeIndex;
            const type = input.dataset.moleculeType;
            const formula = input.dataset.moleculeFormula;
            const coefficient = coefficients[molIndex] || 1;
            const atomsInMolecule = parseMolecule(formula);

            for (const element in atomsInMolecule) {
                allElements.add(element);
                const count = atomsInMolecule[element] * coefficient;
                if (type === 'reactant') {
                    reactantCounts[element] = (reactantCounts[element] || 0) + count;
                } else {
                    productCounts[element] = (productCounts[element] || 0) + count;
                }
            }

            // Track ion contributions for feedback
            polyatomicIons.forEach(ion => {
                if (formula.includes(ion.formula)) {
                    const ionKey = `${type}_${ion.formula}`;
                    ionContributions[ionKey] = (ionContributions[ionKey] || 0) + coefficient;
                }
            });
        });

        atomCountsTableBody.innerHTML = '';
        let allBalanced = true;
        let feedback = [];

        // Render table
        Array.from(allElements).sort().forEach(element => {
            const rCount = reactantCounts[element] || 0;
            const pCount = productCounts[element] || 0;
            const isBalanced = rCount === pCount;

            const row = atomCountsTableBody.insertRow();
            row.insertCell().textContent = element;
            row.insertCell().textContent = rCount;
            row.insertCell().textContent = pCount;
            const balancedCell = row.insertCell();
            balancedCell.textContent = isBalanced ? 'Yes' : 'No';
            balancedCell.className = isBalanced ? 'balanced-true' : 'balanced-false';

            if (!isBalanced) {
                allBalanced = false;
                feedback.push(`Balance ${element}: ${rCount} on reactants, ${pCount} on products.`);
            }
        });

        // Generate ion-based feedback
        polyatomicIons.forEach(ion => {
            const rIonCount = ionContributions[`reactant_${ion.formula}`] || 0;
            const pIonCount = ionContributions[`product_${ion.formula}`] || 0;
            if (rIonCount > 0 || pIonCount > 0) {
                const elements = ion.elements;
                const isIonBalanced = Object.keys(elements).every(elem => {
                    const elemRCount = (reactantCounts[elem] || 0);
                    const elemPCount = (productCounts[elem] || 0);
                    return elemRCount === elemPCount;
                });
                if (!isIonBalanced) {
                    feedback.push(`Ensure ${ion.display} elements match: check ${Object.keys(elements).join(', ')}.`);
                }
            }
        });

        // Update status message
        if (allElements.size === 0) {
            statusMessage.textContent = 'Select an equation to begin or check the equation format.';
            statusMessage.className = 'status-neutral';
        } else if (allBalanced) {
            statusMessage.textContent = 'Equation is BALANCED!';
            statusMessage.className = 'status-balanced';
        } else {
            statusMessage.textContent = `Equation is NOT balanced. ${feedback.join(' ')}`;
            statusMessage.className = 'status-unbalanced';
        }
    }

    equationSelect.addEventListener('change', (event) => {
        if (event.target.value === "") {
            equationDisplay.innerHTML = '';
            atomCountsTableBody.innerHTML = '';
            statusMessage.textContent = 'Select an equation to begin.';
            statusMessage.className = 'status-neutral';
            currentEquation = null;
        } else {
            displayEquation(event.target.value);
        }
    });

    resetButton.addEventListener('click', () => {
        if (currentEquation) {
            displayEquation(currentEquation.id);
        }
    });

    populateEquationSelector();
    updateAtomCounts();
});