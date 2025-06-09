import React, { useState } from 'react';
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Slider,
  Chip,
  Stack,
  IconButton,
  Alert,
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

// 模式选择步骤
const ModeSelection: React.FC<{ onNext: (mode: 'smart' | 'manual') => void }> = ({ onNext }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h6" gutterBottom>
      请选择使用模式
    </Typography>
    <FormControl component="fieldset">
      <RadioGroup>
        <FormControlLabel
          value="smart"
          control={<Radio />}
          label={
            <Box>
              <Typography variant="subtitle1">智能模式</Typography>
              <Typography variant="body2" color="text.secondary">
                通过收集一些基本信息，为您提供更精准的推荐
              </Typography>
            </Box>
          }
          onClick={() => onNext('smart')}
        />
        <FormControlLabel
          value="manual"
          control={<Radio />}
          label={
            <Box>
              <Typography variant="subtitle1">手动模式</Typography>
              <Typography variant="body2" color="text.secondary">
                完全由您自主填写，不收集任何个人信息
              </Typography>
            </Box>
          }
          onClick={() => onNext('manual')}
        />
      </RadioGroup>
    </FormControl>
  </Box>
);

// 家庭/个人模式选择
const FamilyTypeSelection: React.FC<{ onNext: (type: 'family' | 'personal') => void }> = ({ onNext }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h6" gutterBottom>
      请选择使用场景
    </Typography>
    <Stack direction="row" spacing={2} justifyContent="center">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' },
          textAlign: 'center',
          width: 200,
        }}
        onClick={() => onNext('personal')}
      >
        <PersonIcon sx={{ fontSize: 40 }} />
        <Typography variant="h6">个人模式</Typography>
        <Typography variant="body2" color="text.secondary">
          仅为个人使用
        </Typography>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' },
          textAlign: 'center',
          width: 200,
        }}
        onClick={() => onNext('family')}
      >
        <GroupsIcon sx={{ fontSize: 40 }} />
        <Typography variant="h6">家庭模式</Typography>
        <Typography variant="body2" color="text.secondary">
          为全家人使用
        </Typography>
      </Paper>
    </Stack>
  </Box>
);

// 基本信息填写
const BasicInfo: React.FC<{ onNext: (data: any) => void }> = ({ onNext }) => {
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [ageRanges, setAgeRanges] = useState<string[]>([]);
  const [portionSize, setPortionSize] = useState<number>(2);

  const handleSubmit = () => {
    onNext({
      peopleCount,
      ageRanges,
      portionSize,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        基本信息
      </Typography>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>人数</FormLabel>
          <TextField
            type="number"
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            inputProps={{ min: 1, max: 10 }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>年龄范围（可多选）</FormLabel>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {['0-6岁', '7-17岁', '18-30岁', '31-50岁', '51岁以上'].map((range) => (
              <Chip
                key={range}
                label={range}
                onClick={() => {
                  if (ageRanges.includes(range)) {
                    setAgeRanges(ageRanges.filter((r) => r !== range));
                  } else {
                    setAgeRanges([...ageRanges, range]);
                  }
                }}
                color={ageRanges.includes(range) ? 'primary' : 'default'}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </FormControl>

        <FormControl>
          <FormLabel>食量（1-小食量，3-正常，5-大食量）</FormLabel>
          <Slider
            value={portionSize}
            min={1}
            max={5}
            step={1}
            marks
            onChange={(_, value) => setPortionSize(value as number)}
          />
        </FormControl>

        <Button variant="contained" onClick={handleSubmit} disabled={ageRanges.length === 0}>
          下一步
        </Button>
      </Stack>
    </Box>
  );
};

// 可选信息填写
const OptionalInfo: React.FC<{ onComplete: (data: any) => void }> = ({ onComplete }) => {
  const [allergies, setAllergies] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);

  const handleComplete = () => {
    onComplete({
      allergies,
      address,
      preferences,
    });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAddress(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        额外信息（可选）
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        以下信息均为可选，您可以随时跳过
      </Alert>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>过敏原</FormLabel>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {['花生', '海鲜', '蛋类', '乳制品', '坚果'].map((allergy) => (
              <Chip
                key={allergy}
                label={allergy}
                onClick={() => {
                  if (allergies.includes(allergy)) {
                    setAllergies(allergies.filter((a) => a !== allergy));
                  } else {
                    setAllergies([...allergies, allergy]);
                  }
                }}
                color={allergies.includes(allergy) ? 'primary' : 'default'}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </FormControl>

        <FormControl>
          <FormLabel>地址</FormLabel>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="输入地址或使用定位"
            />
            <IconButton onClick={handleLocation} color="primary">
              <MyLocationIcon />
            </IconButton>
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>特殊偏好</FormLabel>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {['素食', '少油', '少盐', '辣', '清淡'].map((pref) => (
              <Chip
                key={pref}
                label={pref}
                onClick={() => {
                  if (preferences.includes(pref)) {
                    setPreferences(preferences.filter((p) => p !== pref));
                  } else {
                    setPreferences([...preferences, pref]);
                  }
                }}
                color={preferences.includes(pref) ? 'primary' : 'default'}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={handleComplete}>
            跳过
          </Button>
          <Button variant="contained" onClick={handleComplete}>
            完成
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

const Onboarding: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [mode, setMode] = useState<'smart' | 'manual' | null>(null);
  const [type, setType] = useState<'family' | 'personal' | null>(null);
  const [userData, setUserData] = useState<any>({});

  const steps = ['选择模式', '使用场景', '基本信息', '可选信息'];

  const handleModeSelection = (selectedMode: 'smart' | 'manual') => {
    setMode(selectedMode);
    if (selectedMode === 'manual') {
      // 如果是手动模式，直接跳转到主页
      // TODO: 实现路由跳转
      console.log('跳转到手动模式主页');
      return;
    }
    setActiveStep(1);
  };

  const handleTypeSelection = (selectedType: 'family' | 'personal') => {
    setType(selectedType);
    setActiveStep(2);
  };

  const handleBasicInfo = (data: any) => {
    setUserData({ ...userData, ...data });
    setActiveStep(3);
  };

  const handleComplete = (data: any) => {
    const finalData = {
      mode,
      type,
      ...userData,
      ...data,
    };
    console.log('完成设置，用户数据：', finalData);
    // TODO: 保存数据并跳转到主页
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && <ModeSelection onNext={handleModeSelection} />}
        {activeStep === 1 && <FamilyTypeSelection onNext={handleTypeSelection} />}
        {activeStep === 2 && <BasicInfo onNext={handleBasicInfo} />}
        {activeStep === 3 && <OptionalInfo onComplete={handleComplete} />}
      </Paper>
    </Container>
  );
};

export default Onboarding; 