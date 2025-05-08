const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];

const strategyArray = [
  {
    View: 'Bullish',
    Value: {
      '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Bull Call Spread'],
      '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'],
      '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put']
    }
  },
  {
    View: 'Bearish',
    Value: {
      '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread'],
      '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'],
      '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put']
    }
  },
  {
    View: 'Range Bound',
    Value: {
      '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Short Straddle'],
      '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'],
      '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor']
    }
  },
  {
    View: 'Volatile',
    Value: {
      '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Long Straddle'],
      '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'],
      '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle']
    }
  }
];

let selectedView = 'Bullish';
let selectedDate = dateArray[0];

const viewToggleContainer = document.getElementById('viewToggle');
const dateDropdown = document.getElementById('dateDropdown');
const strategyContainer = document.getElementById('strategyContainer');


['Bullish', 'Bearish', 'Range Bound', 'Volatile'].forEach(view => {
  const btn = document.createElement('button');
  btn.textContent = view;
  btn.classList.toggle('active', view === selectedView);
  btn.onclick = () => {
    selectedView = view;
    document.querySelectorAll('.slider-toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderStrategies();
  };
  viewToggleContainer.appendChild(btn);
});


dateArray.forEach(date => {
  const opt = document.createElement('option');
  opt.value = date;
  opt.textContent = date;
  dateDropdown.appendChild(opt);
});
dateDropdown.value = selectedDate;

dateDropdown.addEventListener('change', (e) => {
  selectedDate = e.target.value;
  renderStrategies();
});

function renderStrategies() {
  strategyContainer.innerHTML = '';

  const viewObj = strategyArray.find(v => v.View === selectedView);
  const strategies = viewObj?.Value[selectedDate] || [];

  if (strategies.length === 0) {
    strategyContainer.innerHTML = `<div class="empty-state">No strategies found for ${selectedDate}</div>`;
    return;
  }

  const countMap = {};
  strategies.forEach(strat => {
    countMap[strat] = (countMap[strat] || 0) + 1;
  });

  Object.entries(countMap).forEach(([name, count]) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${name}</h3>
      <p>${count} ${count === 1 ? 'Strategy' : 'Strategies'}</p>
    `;
    strategyContainer.appendChild(card);
  });
}

renderStrategies();
